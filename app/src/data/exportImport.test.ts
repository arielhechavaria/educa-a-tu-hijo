import { describe, it, expect } from 'vitest';
import { exportarJSON, importarJSON } from './exportImport';
import { crearProgresoVacio, agregarRegistro, guardarPlan, actualizarAjustes } from './progress';
import type { Resultado } from '../core/types';

describe('exportImport', () => {
  it('round-trips an empty progress', () => {
    const p = crearProgresoVacio();
    expect(importarJSON(exportarJSON(p))).toEqual(p);
  });

  it('exports pretty JSON including the version', () => {
    const text = exportarJSON(crearProgresoVacio());
    expect(text).toContain('\n');
    expect(JSON.parse(text).version).toBe(1);
  });

  it('round-trips history, plans and settings', () => {
    let p = actualizarAjustes(crearProgresoVacio(), { anioVida: 'sexto', duracionMin: 20 });
    p = agregarRegistro(p, { fichaId: 'a', fecha: '2026-11-10', resultado: 'ayuda' });
    p = guardarPlan(p, { fecha: '2026-11-10', fichaIds: ['a', 'b'], dimensionPrincipal: 'comunicacion' });
    expect(importarJSON(exportarJSON(p))).toEqual(p);
  });

  it('round-trips many registros', () => {
    const res: Resultado[] = ['solo', 'ayuda', 'no', 'saltar'];
    let p = crearProgresoVacio();
    for (let i = 0; i < 500; i++) {
      const day = String((i % 28) + 1).padStart(2, '0');
      p = agregarRegistro(p, { fichaId: `f${i}`, fecha: `2026-10-${day}`, resultado: res[i % 4] });
    }
    expect(importarJSON(exportarJSON(p))).toEqual(p);
  });

  it('rejects text that is not JSON, in Spanish', () => {
    expect(() => importarJSON('no es json {')).toThrow(/JSON/);
  });

  it('rejects valid JSON with the wrong shape', () => {
    expect(() => importarJSON('{"foo":1}')).toThrow();
  });
});
