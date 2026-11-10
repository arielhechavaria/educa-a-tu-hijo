import { describe, expect, it } from 'vitest';
import { debeMostrarIntro, marcarIntroVista } from './intro';
import type { KeyValueStore } from './storage';

const memoria = (): KeyValueStore => {
  const m = new Map<string, string>();
  return { get: async (k) => m.get(k) ?? null, set: async (k, v) => void m.set(k, v) };
};

describe('intro', () => {
  it('se muestra en el primer arranque y no vuelve tras marcarla como vista', async () => {
    const s = memoria();
    expect(await debeMostrarIntro(s)).toBe(true);
    await marcarIntroVista(s);
    expect(await debeMostrarIntro(s)).toBe(false);
  });
  it('si el almacenamiento falla, no se muestra y no lanza', async () => {
    const roto: KeyValueStore = { get: async () => { throw new Error('x'); }, set: async () => { throw new Error('x'); } };
    expect(await debeMostrarIntro(roto)).toBe(false);
    await expect(marcarIntroVista(roto)).resolves.toBeUndefined();
  });
});
