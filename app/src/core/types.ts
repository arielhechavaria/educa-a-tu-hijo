/** Shared contract between scheduler (T14), data layer (T15) and UI (T16-T19). Do not change without the parent. */
export type Dimension = 'comunicacion' | 'motricidad' | 'relacion_entorno' | 'estetica' | 'social_personal';
export type AnioVida = 'quinto' | 'sexto';
export type Soporte = 'papel' | 'pantalla' | 'objetos' | 'movimiento' | 'conversacion';
/** solo = "Lo hizo solo", ayuda = "Con ayuda", no = "Todavía no", saltar = "Saltar". */
export type Resultado = 'solo' | 'ayuda' | 'no' | 'saltar';

/** Mirrors content/actividades/*.json (see scripts/validate/schema.mjs). */
export interface Ficha {
  id: string;
  cuaderno: string;
  pagina_pdf: number;
  pagina_impresa: string;
  anio_vida: AnioVida;
  dimension: Dimension;
  subarea: string;
  orden: number;
  titulo: string;
  objetivo: string;
  materiales: string[];
  soporte: Soporte;
  duracion_min: number;
  instruccion_padre: string;
  variante_sin_lamina: string;
  senal_logro: string;
  metas_relacionadas: string[];
  texto_fuente: string;
  confianza: 'alta' | 'media' | 'baja';
}

/** One tap of feedback. `fecha` is a local calendar date, YYYY-MM-DD. */
export interface Registro {
  fichaId: string;
  fecha: string;
  resultado: Resultado;
}

/** The plan proposed for a day; persisted the first time it is generated so it stays stable all day. */
export interface PlanDia {
  fecha: string;
  fichaIds: string[];
  /** Dimension of the first ficha of the plan; used to avoid repeating it the next day. */
  dimensionPrincipal: Dimension;
}

export interface Ajustes {
  anioVida: AnioVida;
  /** Daily target in minutes; default 10. */
  duracionMin: number;
}

export const SCHEMA_VERSION = 1;

export interface Progreso {
  version: number;
  ajustes: Ajustes;
  registros: Registro[];
  planes: PlanDia[];
}

export const AJUSTES_POR_DEFECTO: Ajustes = { anioVida: 'quinto', duracionMin: 10 };
