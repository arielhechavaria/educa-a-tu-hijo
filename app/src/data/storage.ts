import { Preferences } from '@capacitor/preferences';
import type { Progreso } from '../core/types';
import { exportarJSON, importarJSON } from './exportImport';
import { crearProgresoVacio } from './progress';

export interface KeyValueStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

const KEY = 'progreso';

const localStorageStore: KeyValueStore = {
  async get(key) {
    return globalThis.localStorage?.getItem(key) ?? null;
  },
  async set(key, value) {
    globalThis.localStorage?.setItem(key, value);
  },
};

export const preferencesStore: KeyValueStore = {
  async get(key) {
    try {
      return (await Preferences.get({ key })).value;
    } catch {
      return localStorageStore.get(key);
    }
  },
  async set(key, value) {
    try {
      await Preferences.set({ key, value });
    } catch {
      await localStorageStore.set(key, value);
    }
  },
};

const KEY_RESPALDO = 'progreso-respaldo';

/**
 * Loads progress; missing data (first run) yields an empty progress. Corrupt data also yields
 * an empty progress, but its raw text is first copied to `progreso-respaldo`. An existing
 * backup is never overwritten: the first (oldest) corrupt copy is kept.
 */
export async function cargar(store: KeyValueStore = preferencesStore): Promise<Progreso> {
  let text: string | null = null;
  try {
    text = await store.get(KEY);
    if (text === null) return crearProgresoVacio();
    return importarJSON(text);
  } catch {
    if (text !== null) {
      try {
        if ((await store.get(KEY_RESPALDO)) === null) await store.set(KEY_RESPALDO, text);
      } catch { /* backup is best effort */ }
    }
    return crearProgresoVacio();
  }
}

export async function guardar(p: Progreso, store: KeyValueStore = preferencesStore): Promise<void> {
  await store.set(KEY, exportarJSON(p));
}
