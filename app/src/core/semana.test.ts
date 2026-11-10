import { describe, expect, it } from 'vitest';
import { resumenSemana } from './semana';
import type { Ficha, Registro } from './types';

const f = (id: string, dimension: Ficha['dimension'], titulo: string): Ficha => ({
  id, cuaderno: 'c', pagina_pdf: 1, pagina_impresa: '1', anio_vida: 'quinto', dimension, subarea: 's', orden: 1,
  titulo, objetivo: 'o', materiales: [], soporte: 'papel', duracion_min: 3, instruccion_padre: 'i',
  variante_sin_lamina: 'v', senal_logro: 'l', metas_relacionadas: [], texto_fuente: 't', confianza: 'alta',
});
const fichas = [f('a', 'comunicacion', 'Leer imagen'), f('b', 'motricidad', 'Trazo zigzag'), f('c', 'comunicacion', 'Cuento')];
const r = (fichaId: string, fecha: string, resultado: Registro['resultado']): Registro => ({ fichaId, fecha, resultado });

describe('resumenSemana', () => {
  it('groups what was worked by dimension and says how it went', () => {
    const t = resumenSemana({ fichas, hasta: '2026-11-10', registros: [r('a', '2026-11-09', 'solo'), r('b', '2026-11-10', 'ayuda'), r('c', '2026-11-10', 'no')] }).texto;
    expect(t).toContain('Comunicación');
    expect(t).toContain('Leer imagen: lo hizo solo');
    expect(t).toContain('Cuento: todavía no');
    expect(t).toContain('Motricidad');
    expect(t).toContain('Trazo zigzag: con ayuda');
  });
  it('covers the 7 days ending at `hasta` only', () => {
    const t = resumenSemana({ fichas, hasta: '2026-11-10', registros: [r('a', '2026-11-03', 'solo'), r('b', '2026-11-04', 'solo')] }).texto;
    expect(t).not.toContain('Leer imagen');
    expect(t).toContain('Trazo zigzag');
  });
  it('mentions skipped fichas without judging', () => {
    expect(resumenSemana({ fichas, hasta: '2026-11-10', registros: [r('a', '2026-11-10', 'saltar')] }).texto).toContain('Leer imagen: se saltó');
  });
  it('handles an empty week', () => {
    expect(resumenSemana({ fichas, hasta: '2026-11-10', registros: [] }).texto).toContain('No hay actividades registradas');
  });
  it('uses no scores, percentages or grades', () => {
    const t = resumenSemana({ fichas, hasta: '2026-11-10', registros: [r('a', '2026-11-10', 'solo'), r('b', '2026-11-10', 'no')] }).texto;
    expect(t).not.toMatch(/%|\d+\s*\/\s*\d+|puntos|atraso|nota/i);
  });
  it('counts a ficha once with its latest result and ignores unknown ids', () => {
    const t = resumenSemana({ fichas, hasta: '2026-11-10', registros: [r('a', '2026-11-09', 'no'), r('a', '2026-11-10', 'solo'), r('zzz', '2026-11-10', 'solo')] }).texto;
    expect(t).toContain('Leer imagen: lo hizo solo');
    expect(t).not.toContain('todavía no');
  });
});
