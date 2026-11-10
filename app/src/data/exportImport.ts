import type { Progreso } from '../core/types';
import { migrar } from './migrations';

export function exportarJSON(p: Progreso): string {
  return JSON.stringify(p, null, 2);
}

export function importarJSON(text: string): Progreso {
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error('El archivo no es un JSON válido.');
  }
  return migrar(raw);
}
