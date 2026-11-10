import { addDays, parseDate } from './dates';
import type { Dimension, Ficha, Registro, Resultado } from './types';

export const NOMBRE_DIMENSION: Record<Dimension, string> = {
  comunicacion: 'Comunicación',
  motricidad: 'Motricidad',
  relacion_entorno: 'Relación con el entorno',
  estetica: 'Estética',
  social_personal: 'Social y personal',
};
const ORDEN_DIMENSIONES: Dimension[] = ['comunicacion', 'motricidad', 'relacion_entorno', 'estetica', 'social_personal'];

export const TEXTO_RESULTADO: Record<Resultado, string> = {
  solo: 'lo hizo solo',
  ayuda: 'con ayuda',
  no: 'todavía no',
  saltar: 'se saltó',
};

const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

function fechaLarga(fecha: string): { dia: number; mes: string } {
  const d = new Date(parseDate(fecha) * 86_400_000);
  return { dia: d.getUTCDate(), mes: MESES[d.getUTCMonth()] };
}

export interface ResumenSemana {
  desde: string;
  hasta: string;
  texto: string;
}

/** Plain-text summary of the 7 days ending at `hasta`: what was worked per dimension and how it went. */
export function resumenSemana(input: { fichas: readonly Ficha[]; registros: readonly Registro[]; hasta: string }): ResumenSemana {
  const { hasta } = input;
  const desde = addDays(hasta, -6);
  const porId = new Map(input.fichas.map((f) => [f.id, f]));
  const ultimo = new Map<string, Registro>();
  for (const r of [...input.registros].sort((a, b) => a.fecha.localeCompare(b.fecha))) {
    if (r.fecha < desde || r.fecha > hasta || !porId.has(r.fichaId)) continue;
    ultimo.set(r.fichaId, r);
  }
  const a = fechaLarga(desde);
  const b = fechaLarga(hasta);
  const rango = a.mes === b.mes ? `${a.dia} al ${b.dia} de ${b.mes}` : `${a.dia} de ${a.mes} al ${b.dia} de ${b.mes}`;
  const lineas = [`Resumen de la semana (${rango})`];
  if (ultimo.size === 0) {
    lineas.push('', 'No hay actividades registradas esta semana.');
    return { desde, hasta, texto: lineas.join('\n') };
  }
  for (const dim of ORDEN_DIMENSIONES) {
    const items = [...ultimo.values()].filter((r) => porId.get(r.fichaId)!.dimension === dim);
    if (items.length === 0) continue;
    lineas.push('', NOMBRE_DIMENSION[dim]);
    for (const r of items) lineas.push(`- ${porId.get(r.fichaId)!.titulo}: ${TEXTO_RESULTADO[r.resultado]}`);
  }
  return { desde, hasta, texto: lineas.join('\n') };
}
