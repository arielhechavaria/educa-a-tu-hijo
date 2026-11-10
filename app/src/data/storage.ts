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

const preferencesStore: KeyValueStore = {
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

/** Loads progress; missing or corrupt data yields an empty progress. */
export async function cargar(store: KeyValueStore = preferencesStore): Promise<Progreso> {
  try {
    const text = await store.get(KEY);
    if (text === null) return crearProgresoVacio();
    return importarJSON(text);
  } catch {
    return crearProgresoVacio();
  }
}

export async function guardar(p: Progreso, store: KeyValueStore = preferencesStore): Promise<void> {
  await store.set(KEY, exportarJSON(p));
}
