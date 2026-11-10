import { SCHEMA_VERSION, type Dimension, type PlanDia, type Progreso, type Registro, type Resultado } from '../core/types';
import { crearProgresoVacio, validarAjustes } from './progress';

const RESULTADOS: Resultado[] = ['solo', 'ayuda', 'no', 'saltar'];
const DIMENSIONES: Dimension[] = ['comunicacion', 'motricidad', 'relacion_entorno', 'estetica', 'social_personal'];
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

const MSG_INVALIDO = 'Los datos de progreso no son válidos.';

function esObjeto(x: unknown): x is Record<string, unknown> {
  return typeof x === 'object' && x !== null && !Array.isArray(x);
}

function validarRegistro(x: unknown): Registro {
  if (!esObjeto(x)) throw new Error('Un registro del progreso no es válido.');
  if (typeof x.fichaId !== 'string' || x.fichaId === '') throw new Error('Un registro no tiene ficha.');
  if (typeof x.fecha !== 'string' || !FECHA.test(x.fecha)) throw new Error('Un registro tiene una fecha inválida (se espera AAAA-MM-DD).');
  if (!RESULTADOS.includes(x.resultado as Resultado)) throw new Error('Un registro tiene un resultado inválido.');
  return { fichaId: x.fichaId, fecha: x.fecha, resultado: x.resultado as Resultado };
}

function validarPlan(x: unknown): PlanDia {
  if (!esObjeto(x)) throw new Error('Un plan del progreso no es válido.');
  if (typeof x.fecha !== 'string' || !FECHA.test(x.fecha)) throw new Error('Un plan tiene una fecha inválida (se espera AAAA-MM-DD).');
  if (!Array.isArray(x.fichaIds) || !x.fichaIds.every((i) => typeof i === 'string')) {
    throw new Error('Un plan tiene una lista de fichas inválida.');
  }
  if (!DIMENSIONES.includes(x.dimensionPrincipal as Dimension)) throw new Error('Un plan tiene una dimensión inválida.');
  return { fecha: x.fecha, fichaIds: [...(x.fichaIds as string[])], dimensionPrincipal: x.dimensionPrincipal as Dimension };
}

/** v0 -> v1: records used `ficha` instead of `fichaId`; no settings or plans existed. */
function deV0(raw: Record<string, unknown>): Record<string, unknown> {
  const registros = Array.isArray(raw.registros) ? raw.registros : [];
  const base = crearProgresoVacio();
  return {
    ...base,
    registros: registros.map((r) => {
      if (!esObjeto(r)) return r;
      const { ficha, ...resto } = r;
      return { ...resto, fichaId: ficha };
    }),
  };
}

/** Accepts any known shape and returns a valid current Progreso, or throws a Spanish Error. */
export function migrar(raw: unknown): Progreso {
  if (!esObjeto(raw)) throw new Error(MSG_INVALIDO);
  let obj = raw;
  const version = raw.version === undefined ? (Array.isArray(raw.registros) ? 0 : undefined) : raw.version;
  if (typeof version !== 'number' || !Number.isInteger(version)) throw new Error(`${MSG_INVALIDO} Falta la versión.`);
  if (version > SCHEMA_VERSION) {
    throw new Error(`Este progreso viene de una versión más nueva (${version}) de la app. Actualiza la app para abrirlo.`);
  }
  if (version < 0) throw new Error(`${MSG_INVALIDO} La versión no es válida.`);
  if (version === 0) obj = deV0(raw);

  if (!Array.isArray(obj.registros) || !Array.isArray(obj.planes) || !esObjeto(obj.ajustes)) {
    throw new Error(`${MSG_INVALIDO} Faltan ajustes, registros o planes.`);
  }
  const ajustes = validarAjustes(obj.ajustes as never);
  return {
    version: SCHEMA_VERSION,
    ajustes,
    registros: obj.registros.map(validarRegistro),
    planes: obj.planes.map(validarPlan),
  };
}
