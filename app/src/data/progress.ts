import { AJUSTES_POR_DEFECTO, SCHEMA_VERSION, type Ajustes, type PlanDia, type Progreso, type Registro } from '../core/types';

export function crearProgresoVacio(): Progreso {
  return { version: SCHEMA_VERSION, ajustes: { ...AJUSTES_POR_DEFECTO }, registros: [], planes: [] };
}

/** Adds a registro; a later one for the same ficha and date replaces the earlier one. */
export function agregarRegistro(p: Progreso, registro: Registro): Progreso {
  const resto = p.registros.filter((r) => !(r.fichaId === registro.fichaId && r.fecha === registro.fecha));
  return { ...p, registros: [...resto, { ...registro }] };
}

/** Stores the plan of a day, replacing any previous plan of the same date. */
export function guardarPlan(p: Progreso, plan: PlanDia): Progreso {
  const resto = p.planes.filter((x) => x.fecha !== plan.fecha);
  return { ...p, planes: [...resto, { ...plan, fichaIds: [...plan.fichaIds] }] };
}

/** Validates settings; throws an Error with a Spanish message when invalid. */
export function validarAjustes(a: Ajustes): Ajustes {
  if (a.anioVida !== 'quinto' && a.anioVida !== 'sexto') {
    throw new Error('El año de vida debe ser "quinto" o "sexto".');
  }
  if (!Number.isInteger(a.duracionMin) || a.duracionMin < 5 || a.duracionMin > 30) {
    throw new Error('La duración diaria debe ser un número entero de minutos entre 5 y 30.');
  }
  return { anioVida: a.anioVida, duracionMin: a.duracionMin };
}

export function actualizarAjustes(p: Progreso, parcial: Partial<Ajustes>): Progreso {
  return { ...p, ajustes: validarAjustes({ ...p.ajustes, ...parcial }) };
}
