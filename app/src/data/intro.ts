import type { KeyValueStore } from './storage';

const KEY = 'intro-vista';

/** The intro is shown until the user has finished or skipped it once. */
export async function debeMostrarIntro(store: KeyValueStore): Promise<boolean> {
  try {
    return (await store.get(KEY)) !== '1';
  } catch {
    return false; // if storage fails, never trap the user behind the intro
  }
}

export async function marcarIntroVista(store: KeyValueStore): Promise<void> {
  try {
    await store.set(KEY, '1');
  } catch {
    /* ignore: worst case the intro is offered again */
  }
}
