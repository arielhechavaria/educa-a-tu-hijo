import { describe, expect, it } from 'vitest';
import { addDays } from './dates';
import { MAX_FICHAS, MIN_FICHAS, REVIEW_WINDOWS, planificarDia, reviewSchedule } from './scheduler';
import type { PlanificarDiaInput } from './scheduler';
import { AJUSTES_POR_DEFECTO } from './types';
import type { Ajustes, AnioVida, Ficha, PlanDia, Registro, Resultado } from './types';

const D = '2026-11-10';

function ficha(id: string, over: Partial<Ficha> = {}): Ficha {
  return {
    id,
    cuaderno: 'cuaderno-a',
    pagina_pdf: 1,
    pagina_impresa: '1',
    anio_vida: 'quinto',
    dimension: 'relacion_entorno',
    subarea: 'subarea',
    orden: 1,
    titulo: id,
    objetivo: '',
    materiales: [],
    soporte: 'papel',
    duracion_min: 3,
    instruccion_padre: '',
    variante_sin_lamina: '',
    senal_logro: '',
    metas_relacionadas: [],
    texto_fuente: '',
    confianza: 'alta',
    ...over,
  };
}

/** `count` fichas of one cuaderno, in notebook order. */
function serie(prefix: string, count: number, over: Partial<Ficha> = {}): Ficha[] {
  return Array.from({ length: count }, (_, i) =>
    ficha(`${prefix}${i + 1}`, { cuaderno: `cuaderno-${prefix}`, orden: i + 1, ...over }),
  );
}

function reg(fichaId: string, fecha: string, resultado: Resultado): Registro {
  return { fichaId, fecha, resultado };
}

function plan(input: Partial<PlanificarDiaInput> & { fichas: Ficha[] }): PlanDia | null {
  return planificarDia({ fecha: D, registros: [], planes: [], ajustes: AJUSTES_POR_DEFECTO, ...input });
}

function ids(input: Partial<PlanificarDiaInput> & { fichas: Ficha[] }): string[] {
  return plan(input)?.fichaIds ?? [];
}

describe('reviewSchedule (intervals)', () => {
  it('returns null for a ficha without registros', () => {
    expect(reviewSchedule([])).toBeNull();
  });

  it('"Todavía no" comes back after 2–3 days', () => {
    expect(reviewSchedule([reg('x', D, 'no')])).toEqual({
      state: 'no',
      lastFecha: D,
      readyOn: addDays(D, 2),
      dueOn: addDays(D, 3),
    });
  });

  it('"Con ayuda" comes back after 5–7 days', () => {
    const s = reviewSchedule([reg('x', D, 'ayuda')]);
    expect(s).toMatchObject({ state: 'ayuda', readyOn: addDays(D, 5), dueOn: addDays(D, 7) });
  });

  it('a single "Lo hizo solo" comes back after about 10 days', () => {
    const s = reviewSchedule([reg('x', D, 'solo')]);
    expect(s).toMatchObject({
      state: 'soloOnce',
      readyOn: addDays(D, REVIEW_WINDOWS.soloOnce.readyAfterDays),
      dueOn: addDays(D, REVIEW_WINDOWS.soloOnce.dueAfterDays),
    });
    expect(REVIEW_WINDOWS.soloOnce.readyAfterDays).toBe(10);
  });

  it('"Lo hizo solo" twice in a row means a review about every 3 weeks', () => {
    const s = reviewSchedule([reg('x', '2026-10-01', 'solo'), reg('x', D, 'solo')]);
    expect(s).toMatchObject({ state: 'soloTwice', readyOn: addDays(D, 21), dueOn: addDays(D, 24) });
  });

  it('keeps the 3-week review after further consecutive "solo" results', () => {
    const s = reviewSchedule([reg('x', '2026-09-01', 'solo'), reg('x', '2026-10-01', 'solo'), reg('x', D, 'solo')]);
    expect(s?.state).toBe('soloTwice');
  });

  it('a non-solo result breaks the solo streak', () => {
    const s = reviewSchedule([reg('x', '2026-10-01', 'solo'), reg('x', '2026-10-05', 'ayuda'), reg('x', D, 'solo')]);
    expect(s?.state).toBe('soloOnce');
  });

  it('"Saltar" neither counts as a result nor breaks the solo streak', () => {
    const s = reviewSchedule([reg('x', '2026-10-01', 'solo'), reg('x', '2026-10-05', 'saltar'), reg('x', D, 'solo')]);
    expect(s?.state).toBe('soloTwice');
  });

  it('"Saltar" as latest result brings the ficha back the next day', () => {
    const s = reviewSchedule([reg('x', '2026-10-01', 'solo'), reg('x', '2026-10-02', 'solo'), reg('x', D, 'saltar')]);
    expect(s).toMatchObject({ state: 'saltar', readyOn: addDays(D, 1), dueOn: addDays(D, 3) });
  });

  it('uses the latest registro by fecha regardless of input order', () => {
    const s = reviewSchedule([reg('x', D, 'no'), reg('x', '2026-10-01', 'solo')]);
    expect(s).toMatchObject({ state: 'no', lastFecha: D });
  });

  it('on the same fecha the last registro wins and two taps count as one day', () => {
    expect(reviewSchedule([reg('x', D, 'no'), reg('x', D, 'ayuda')])?.state).toBe('ayuda');
    expect(reviewSchedule([reg('x', D, 'solo'), reg('x', D, 'solo')])?.state).toBe('soloOnce');
  });

  it('computes dates across the end of the year', () => {
    const s = reviewSchedule([reg('x', '2026-12-30', 'no')]);
    expect(s).toMatchObject({ readyOn: '2027-01-01', dueOn: '2027-01-02' });
  });
});

describe('planificarDia: size and duration', () => {
  it('returns null when the active year has no fichas', () => {
    expect(plan({ fichas: serie('a', 4, { anio_vida: 'sexto' }) })).toBeNull();
  });

  it('never goes below 3 fichas even if the minimum exceeds the target', () => {
    const p = ids({ fichas: serie('a', 8, { duracion_min: 5 }) });
    expect(p).toHaveLength(MIN_FICHAS);
  });

  it('adds fichas up to 5 to get close to the target duration', () => {
    expect(ids({ fichas: serie('a', 8, { duracion_min: 2 }) })).toHaveLength(MAX_FICHAS);
  });

  it('stops when one more ficha would move further from the target', () => {
    // 3 + 3 + 3 = 9; a fourth would reach 12, further from 10 than 9.
    expect(ids({ fichas: serie('a', 8, { duracion_min: 3 }) })).toHaveLength(3);
    // 2 + 2 + 2 = 6; a fourth (4 min) reaches exactly 10.
    const fichas = [...serie('a', 3, { duracion_min: 2 }), ficha('b1', { cuaderno: 'b', orden: 9, duracion_min: 4 })];
    expect(ids({ fichas })).toEqual(['a1', 'a2', 'a3', 'b1']);
  });

  it('respects the configured daily duration', () => {
    const ajustes: Ajustes = { anioVida: 'quinto', duracionMin: 20 };
    expect(ids({ fichas: serie('a', 8, { duracion_min: 4 }), ajustes })).toHaveLength(5);
  });

  it('returns every available ficha when fewer than 3 exist', () => {
    expect(ids({ fichas: serie('a', 2) })).toEqual(['a1', 'a2']);
  });
});

describe('planificarDia: active year of life', () => {
  const fichas = [...serie('q', 4, { anio_vida: 'quinto' }), ...serie('s', 4, { anio_vida: 'sexto' })];

  it('only proposes fichas of the active year', () => {
    expect(ids({ fichas }).every((id) => id.startsWith('q'))).toBe(true);
  });

  it('switches to the other year when ajustes.anioVida changes, ignoring history of the previous year', () => {
    const anioVida: AnioVida = 'sexto';
    const p = ids({
      fichas,
      ajustes: { anioVida, duracionMin: 10 },
      registros: [reg('q1', addDays(D, -3), 'no')],
    });
    expect(p).toEqual(['s1', 's2', 's3']);
  });
});

describe('planificarDia: never-seen fichas first, in notebook order', () => {
  it('follows `orden` within a cuaderno regardless of input order', () => {
    const fichas = serie('a', 5).reverse();
    expect(ids({ fichas })).toEqual(['a1', 'a2', 'a3']);
  });

  it('continues after the fichas that already have a registro', () => {
    const p = ids({ fichas: serie('a', 6), registros: [reg('a1', addDays(D, -1), 'solo'), reg('a2', addDays(D, -1), 'solo')] });
    expect(p).toEqual(['a3', 'a4', 'a5']);
  });

  it('interleaves cuadernos to mix dimensions without breaking each notebook order', () => {
    const fichas = [
      ...serie('a', 3, { dimension: 'relacion_entorno', duracion_min: 2 }),
      ...serie('b', 3, { dimension: 'comunicacion', duracion_min: 2 }),
    ];
    expect(ids({ fichas })).toEqual(['a1', 'b1', 'a2', 'b2', 'a3']);
  });

  it('prefers a ficha of a dimension not yet in the plan', () => {
    const fichas = [
      ...serie('a', 4, { dimension: 'relacion_entorno' }),
      // Later in their notebooks than a2, but of dimensions not yet in the plan.
      ...serie('b', 4, { dimension: 'comunicacion' }).map((f) => ({ ...f, orden: f.orden + 4 })),
      ...serie('c', 4, { dimension: 'motricidad' }).map((f) => ({ ...f, orden: f.orden + 6 })),
    ];
    const p = plan({ fichas });
    expect(p?.fichaIds).toEqual(['a1', 'b1', 'c1']);
  });

  it('a ficha seen once is no longer new: "Todavía no" waits 2 days while new fichas exist', () => {
    const fichas = [ficha('x', { cuaderno: 'x', orden: 1, duracion_min: 5 }), ...serie('n', 5, { duracion_min: 5 })];
    const registros = [reg('x', D, 'no')];
    expect(ids({ fichas, registros, fecha: addDays(D, 1) })).not.toContain('x');
    // Ready (day 2) but new fichas fill the plan first.
    expect(ids({ fichas, registros, fecha: addDays(D, 2) })).not.toContain('x');
  });
});

describe('planificarDia: review intervals', () => {
  /** Three new 2-minute fichas leave room for one review in a 10-minute plan. */
  const nuevas = serie('n', 3, { duracion_min: 2 });

  it('"Todavía no": not before day 2, after new fichas on day 2, first on day 3', () => {
    const fichas = [ficha('x', { cuaderno: 'x', dimension: 'comunicacion', duracion_min: 2 }), ...nuevas];
    const registros = [reg('x', D, 'no')];
    expect(ids({ fichas, registros, fecha: addDays(D, 1) })).toEqual(['n1', 'n2', 'n3']);
    expect(ids({ fichas, registros, fecha: addDays(D, 2) })).toEqual(['n1', 'n2', 'n3', 'x']);
    expect(ids({ fichas, registros, fecha: addDays(D, 3) })[0]).toBe('x');
  });

  it('"Con ayuda": not before day 5, after new fichas on day 5, first on day 7', () => {
    const fichas = [ficha('x', { cuaderno: 'x', dimension: 'comunicacion', duracion_min: 2 }), ...nuevas];
    const registros = [reg('x', D, 'ayuda')];
    expect(ids({ fichas, registros, fecha: addDays(D, 4) })).not.toContain('x');
    expect(ids({ fichas, registros, fecha: addDays(D, 5) })).toEqual(['n1', 'n2', 'n3', 'x']);
    expect(ids({ fichas, registros, fecha: addDays(D, 6) })[0]).toBe('n1');
    expect(ids({ fichas, registros, fecha: addDays(D, 7) })[0]).toBe('x');
  });

  it('"Lo hizo solo" twice: back for review after ~3 weeks', () => {
    const fichas = [ficha('x', { cuaderno: 'x', dimension: 'comunicacion', duracion_min: 2 }), ...nuevas];
    const registros = [reg('x', addDays(D, -1), 'solo'), reg('x', D, 'solo')];
    expect(ids({ fichas, registros, fecha: addDays(D, 20) })).not.toContain('x');
    expect(ids({ fichas, registros, fecha: addDays(D, 21) })).toContain('x');
    expect(ids({ fichas, registros, fecha: addDays(D, 24) })[0]).toBe('x');
  });

  it('a single "Lo hizo solo" comes back after 10 days', () => {
    const fichas = [ficha('x', { cuaderno: 'x', dimension: 'comunicacion', duracion_min: 2 }), ...nuevas];
    const registros = [reg('x', D, 'solo')];
    expect(ids({ fichas, registros, fecha: addDays(D, 9) })).not.toContain('x');
    expect(ids({ fichas, registros, fecha: addDays(D, 10) })).toContain('x');
  });

  it('"Saltar" is not mastered: eligible the next day, after other ready reviews', () => {
    const fichas = [
      ficha('s', { cuaderno: 'x', orden: 1, dimension: 'comunicacion', duracion_min: 2 }),
      ficha('r', { cuaderno: 'x', orden: 2, dimension: 'comunicacion', duracion_min: 2 }),
      ficha('n1', { cuaderno: 'n', orden: 1, duracion_min: 2 }),
      ficha('n2', { cuaderno: 'n', orden: 2, duracion_min: 2 }),
    ];
    const registros = [reg('r', addDays(D, -2), 'no'), reg('s', addDays(D, -1), 'saltar')];
    // New fichas first, then the ready "no" review, then the skipped one.
    expect(ids({ fichas, registros })).toEqual(['n1', 'n2', 'r', 's']);
  });

  it('a skipped ficha does not block the next fichas of its cuaderno', () => {
    const fichas = serie('a', 6, { duracion_min: 5 });
    expect(ids({ fichas, registros: [reg('a1', addDays(D, -1), 'saltar')] })).toEqual(['a2', 'a3', 'a4']);
  });

  it('due reviews never take every slot while never-seen fichas remain', () => {
    const fichas = [...serie('r', 6, { duracion_min: 5 }), ...serie('n', 3, { duracion_min: 5 })];
    const registros = serie('r', 6).map((f) => reg(f.id, addDays(D, -5), 'no'));
    expect(ids({ fichas, registros })).toEqual(['r1', 'r2', 'n1']);
  });

  it('ignores registros dated after the planned fecha', () => {
    const fichas = serie('a', 6, { duracion_min: 5 });
    expect(ids({ fichas, registros: [reg('a1', addDays(D, 1), 'solo')] })).toEqual(['a1', 'a2', 'a3']);
  });

  it('when everything was done alone and nothing is ready, proposes the 3 closest to their review', () => {
    const fichas = serie('a', 6);
    const registros = fichas.flatMap((f, i) => [
      reg(f.id, addDays(D, -30 + i), 'solo'),
      reg(f.id, addDays(D, -10 + i), 'solo'),
    ]);
    // a1 is ready on D+11, a2 on D+12, ...
    expect(ids({ fichas, registros })).toEqual(['a1', 'a2', 'a3']);
  });

  it('fills with not-ready fichas only up to the minimum of 3', () => {
    const fichas = serie('a', 6, { duracion_min: 2 });
    const registros = fichas.slice(1).map((f) => reg(f.id, addDays(D, -1), 'solo'));
    // a1 is new; the rest are not ready: only 2 are added to reach 3.
    expect(ids({ fichas, registros })).toHaveLength(3);
    expect(ids({ fichas, registros })[0]).toBe('a1');
  });
});

describe('planificarDia: rotating the main dimension', () => {
  const fichas = [
    ...serie('a', 6, { dimension: 'relacion_entorno' }),
    ...serie('b', 6, { dimension: 'comunicacion' }).map((f) => ({ ...f, orden: f.orden + 10 })),
  ];

  it('does not repeat the previous plan main dimension', () => {
    const ayer: PlanDia = { fecha: addDays(D, -1), fichaIds: ['zz'], dimensionPrincipal: 'relacion_entorno' };
    const p = plan({ fichas, planes: [ayer] });
    expect(p?.dimensionPrincipal).toBe('comunicacion');
    expect(p?.fichaIds[0]).toBe('b1');
  });

  it('looks at the latest plan before fecha, ignoring older, same-day and future plans', () => {
    const planes: PlanDia[] = [
      { fecha: addDays(D, -5), fichaIds: [], dimensionPrincipal: 'comunicacion' },
      { fecha: addDays(D, -2), fichaIds: [], dimensionPrincipal: 'relacion_entorno' },
      { fecha: D, fichaIds: [], dimensionPrincipal: 'comunicacion' },
      { fecha: addDays(D, 1), fichaIds: [], dimensionPrincipal: 'comunicacion' },
    ];
    expect(plan({ fichas, planes })?.dimensionPrincipal).toBe('comunicacion');
    const solo2: PlanDia[] = [...planes.slice(0, 1), ...planes.slice(2)];
    expect(plan({ fichas, planes: solo2 })?.dimensionPrincipal).toBe('relacion_entorno');
  });

  it('still plans when only one dimension exists', () => {
    const ayer: PlanDia = { fecha: addDays(D, -1), fichaIds: [], dimensionPrincipal: 'relacion_entorno' };
    expect(ids({ fichas: serie('a', 4), planes: [ayer] })).toEqual(['a1', 'a2', 'a3']);
  });

  it('alternates over consecutive days even with dimensions missing from the content', () => {
    const dims = simulate(fichas, 8, 'solo').map((p) => p.dimensionPrincipal);
    for (let i = 1; i < dims.length; i++) expect(dims[i]).not.toBe(dims[i - 1]);
    expect(dims).not.toContain('estetica');
  });
});

describe('planificarDia: determinism', () => {
  const fichas = [
    ...serie('a', 5, { dimension: 'relacion_entorno' }),
    ...serie('b', 5, { dimension: 'comunicacion' }),
    ...serie('c', 5, { dimension: 'motricidad' }),
  ];
  const registros = [reg('a1', addDays(D, -3), 'no'), reg('b1', addDays(D, -6), 'ayuda'), reg('c1', addDays(D, -1), 'saltar')];
  const planes: PlanDia[] = [{ fecha: addDays(D, -1), fichaIds: ['c1'], dimensionPrincipal: 'motricidad' }];

  it('same fecha and same state give the same plan', () => {
    expect(plan({ fichas, registros, planes })).toEqual(plan({ fichas, registros, planes }));
  });

  it('does not depend on input order', () => {
    const a = plan({ fichas, registros, planes });
    const b = plan({ fichas: [...fichas].reverse(), registros: [...registros].reverse(), planes: [...planes].reverse() });
    expect(b).toEqual(a);
  });

  it('does not mutate its inputs', () => {
    const copy = structuredClone({ fichas, registros, planes });
    plan({ fichas, registros, planes });
    expect({ fichas, registros, planes }).toEqual(copy);
  });

  it('rejects an invalid fecha', () => {
    expect(() => plan({ fichas, fecha: '2026-02-30' })).toThrow();
  });
});

describe('planificarDia with the real content (quinto)', () => {
  const modules = import.meta.glob<Ficha[]>('../../../content/actividades/*.json', { eager: true, import: 'default' });
  const all = Object.values(modules).flat();
  const byId = new Map(all.map((f) => [f.id, f]));
  const quinto = all.filter((f) => f.anio_vida === 'quinto');

  it('loads the content', () => {
    expect(quinto.length).toBeGreaterThan(10);
  });

  it('proposes 3–5 fichas of quinto adding up to about 10 minutes, stably', () => {
    const p = plan({ fichas: all })!;
    const again = plan({ fichas: all });
    expect(again).toEqual(p);
    expect(p.fichaIds.length).toBeGreaterThanOrEqual(3);
    expect(p.fichaIds.length).toBeLessThanOrEqual(5);
    const fichas = p.fichaIds.map((id) => byId.get(id)!);
    expect(fichas.every((f) => f.anio_vida === 'quinto')).toBe(true);
    const minutes = fichas.reduce((sum, f) => sum + f.duracion_min, 0);
    expect(minutes).toBeGreaterThanOrEqual(6);
    expect(minutes).toBeLessThanOrEqual(15);
    expect(p.dimensionPrincipal).toBe(fichas[0].dimension);
  });

  it('over 80 simulated days keeps the rules, adds a new ficha every day and covers all of quinto', () => {
    const plans = simulate(all, 80, 'mixed');
    const seen = new Set<string>();
    for (let i = 0; i < plans.length; i++) {
      const p = plans[i];
      expect(p.fichaIds.length).toBeGreaterThanOrEqual(3);
      expect(p.fichaIds.length).toBeLessThanOrEqual(5);
      expect(new Set(p.fichaIds).size).toBe(p.fichaIds.length);
      if (i > 0) expect(p.dimensionPrincipal).not.toBe(plans[i - 1].dimensionPrincipal);
      if (seen.size < quinto.length) expect(p.fichaIds.some((id) => !seen.has(id))).toBe(true);
      for (const id of p.fichaIds) {
        expect(byId.get(id)!.anio_vida).toBe('quinto');
        seen.add(id);
      }
    }
    expect(seen.size).toBe(quinto.length);
  });
});

/**
 * Plans `days` consecutive days starting at D, persisting each plan and recording a result for every ficha.
 * 'mixed' cycles through solo/ayuda/no/saltar deterministically.
 */
function simulate(fichas: Ficha[], days: number, mode: 'solo' | 'mixed'): PlanDia[] {
  const cycle: Resultado[] = ['solo', 'ayuda', 'solo', 'no', 'solo', 'saltar'];
  const planes: PlanDia[] = [];
  const registros: Registro[] = [];
  let k = 0;
  for (let i = 0; i < days; i++) {
    const fecha = addDays(D, i);
    const p = planificarDia({ fecha, fichas, registros, planes, ajustes: AJUSTES_POR_DEFECTO });
    if (!p) throw new Error('no plan');
    planes.push(p);
    for (const id of p.fichaIds) registros.push(reg(id, fecha, mode === 'solo' ? 'solo' : cycle[k++ % cycle.length]));
  }
  return planes;
}
