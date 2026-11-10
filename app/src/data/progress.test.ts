import { describe, it, expect } from 'vitest';
import { crearProgresoVacio, agregarRegistro, guardarPlan, actualizarAjustes } from './progress';
import { SCHEMA_VERSION, AJUSTES_POR_DEFECTO, type PlanDia } from '../core/types';

describe('progress', () => {
  it('creates an empty progress with defaults', () => {
    const p = crearProgresoVacio();
    expect(p).toEqual({ version: SCHEMA_VERSION, ajustes: AJUSTES_POR_DEFECTO, registros: [], planes: [] });
  });

  it('adds a registro immutably', () => {
    const p = crearProgresoVacio();
    const q = agregarRegistro(p, { fichaId: 'a', fecha: '2026-11-10', resultado: 'solo' });
    expect(p.registros).toHaveLength(0);
    expect(q.registros).toHaveLength(1);
  });

  it('replaces a registro for the same ficha and date', () => {
    let p = crearProgresoVacio();
    p = agregarRegistro(p, { fichaId: 'a', fecha: '2026-11-10', resultado: 'no' });
    p = agregarRegistro(p, { fichaId: 'b', fecha: '2026-11-10', resultado: 'ayuda' });
    p = agregarRegistro(p, { fichaId: 'a', fecha: '2026-11-10', resultado: 'solo' });
    expect(p.registros).toHaveLength(2);
    expect(p.registros.find((r) => r.fichaId === 'a')?.resultado).toBe('solo');
  });

  it('keeps registros of the same ficha on different dates', () => {
    let p = crearProgresoVacio();
    p = agregarRegistro(p, { fichaId: 'a', fecha: '2026-11-10', resultado: 'no' });
    p = agregarRegistro(p, { fichaId: 'a', fecha: '2026-11-11', resultado: 'solo' });
    expect(p.registros).toHaveLength(2);
  });

  it('replaces the plan of the same date', () => {
    const plan: PlanDia = { fecha: '2026-11-10', fichaIds: ['a'], dimensionPrincipal: 'motricidad' };
    const plan2: PlanDia = { fecha: '2026-11-10', fichaIds: ['b'], dimensionPrincipal: 'estetica' };
    const p0 = crearProgresoVacio();
    const p1 = guardarPlan(guardarPlan(p0, plan), plan2);
    expect(p0.planes).toHaveLength(0);
    expect(p1.planes).toEqual([plan2]);
    const p2 = guardarPlan(p1, { ...plan, fecha: '2026-11-11' });
    expect(p2.planes).toHaveLength(2);
  });

  it('updates settings', () => {
    const p = actualizarAjustes(crearProgresoVacio(), { duracionMin: 15, anioVida: 'sexto' });
    expect(p.ajustes).toEqual({ duracionMin: 15, anioVida: 'sexto' });
  });

  it('rejects invalid settings in Spanish', () => {
    const p = crearProgresoVacio();
    expect(() => actualizarAjustes(p, { duracionMin: 4 })).toThrow(/duración/i);
    expect(() => actualizarAjustes(p, { duracionMin: 31 })).toThrow(/duración/i);
    expect(() => actualizarAjustes(p, { duracionMin: 10.5 })).toThrow(/duración/i);
    expect(() => actualizarAjustes(p, { anioVida: 'septimo' as never })).toThrow(/año de vida/i);
  });
});
