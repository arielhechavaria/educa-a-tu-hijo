import { describe, it, expect } from 'vitest';
import { migrar } from './migrations';
import { crearProgresoVacio } from './progress';
import { SCHEMA_VERSION, AJUSTES_POR_DEFECTO } from '../core/types';

describe('migrar', () => {
  it('accepts the current version unchanged', () => {
    const p = { ...crearProgresoVacio(), registros: [{ fichaId: 'a', fecha: '2026-11-10', resultado: 'solo' as const }] };
    expect(migrar(p)).toEqual(p);
  });

  it('upgrades a synthetic v0 shape to the current version', () => {
    const v0 = { registros: [{ ficha: 'x1', fecha: '2026-11-01', resultado: 'ayuda' }] };
    const p = migrar(v0);
    expect(p.version).toBe(SCHEMA_VERSION);
    expect(p.ajustes).toEqual(AJUSTES_POR_DEFECTO);
    expect(p.planes).toEqual([]);
    expect(p.registros).toEqual([{ fichaId: 'x1', fecha: '2026-11-01', resultado: 'ayuda' }]);
  });

  it('upgrades an explicit version 0 object', () => {
    expect(migrar({ version: 0, registros: [] }).version).toBe(SCHEMA_VERSION);
  });

  it.each([null, 'texto', 42, [], {}, { version: 'x' }])('rejects invalid input %j', (raw) => {
    expect(() => migrar(raw)).toThrow(/progreso|datos|versión/i);
  });

  it('rejects a future version', () => {
    expect(() => migrar({ ...crearProgresoVacio(), version: SCHEMA_VERSION + 1 })).toThrow(/versión/i);
  });

  it('rejects bad registros, plans and settings', () => {
    const base = crearProgresoVacio();
    expect(() => migrar({ ...base, registros: [{ fichaId: 'a', fecha: '10/11/2026', resultado: 'solo' }] })).toThrow(/fecha/i);
    expect(() => migrar({ ...base, registros: [{ fichaId: 'a', fecha: '2026-11-10', resultado: 'genial' }] })).toThrow(/resultado/i);
    expect(() => migrar({ ...base, planes: [{ fecha: '2026-11-10', fichaIds: 'a', dimensionPrincipal: 'motricidad' }] })).toThrow(/plan/i);
    expect(() => migrar({ ...base, planes: [{ fecha: '2026-11-10', fichaIds: ['a'], dimensionPrincipal: 'otra' }] })).toThrow(/dimensión/i);
    expect(() => migrar({ ...base, ajustes: { anioVida: 'quinto', duracionMin: 99 } })).toThrow(/duración/i);
  });
});
