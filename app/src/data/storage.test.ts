import { describe, it, expect } from 'vitest';
import { cargar, guardar, type KeyValueStore } from './storage';
import { crearProgresoVacio, agregarRegistro } from './progress';

function fakeStore(initial: Record<string, string> = {}): KeyValueStore & { data: Record<string, string> } {
  const data = { ...initial };
  return {
    data,
    async get(k) { return k in data ? data[k] : null; },
    async set(k, v) { data[k] = v; },
  };
}

describe('storage', () => {
  it('returns empty progress when nothing is stored', async () => {
    expect(await cargar(fakeStore())).toEqual(crearProgresoVacio());
  });

  it('saves and loads progress', async () => {
    const s = fakeStore();
    const p = agregarRegistro(crearProgresoVacio(), { fichaId: 'a', fecha: '2026-11-10', resultado: 'solo' });
    await guardar(p, s);
    expect(await cargar(s)).toEqual(p);
  });

  it('falls back to empty progress on corrupt data without throwing', async () => {
    const s = fakeStore();
    await s.set('progreso', '{{{ corrupto');
    expect(await cargar(s)).toEqual(crearProgresoVacio());
    await s.set('progreso', JSON.stringify({ version: 1, ajustes: 3 }));
    expect(await cargar(s)).toEqual(crearProgresoVacio());
  });
});
