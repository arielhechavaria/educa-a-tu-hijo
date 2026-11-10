import { readFileSync } from 'node:fs';
import { basename } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ANIO_VIDA = ['quinto', 'sexto'];
export const DIMENSIONES = ['comunicacion', 'motricidad', 'relacion_entorno', 'estetica', 'social_personal'];
export const SOPORTES = ['papel', 'pantalla', 'objetos', 'movimiento', 'conversacion'];
export const CONFIANZAS = ['alta', 'media', 'baja'];
export const CUADERNOS_META = ['diagnostico-egreso-5-6', 'tareas-diagnosticas-preescolar'];

const FICHA_FIELDS = ['id', 'cuaderno', 'pagina_pdf', 'pagina_impresa', 'anio_vida', 'dimension', 'subarea', 'orden',
  'titulo', 'objetivo', 'materiales', 'soporte', 'duracion_min', 'instruccion_padre', 'variante_sin_lamina',
  'senal_logro', 'metas_relacionadas', 'texto_fuente', 'confianza'];
const META_FIELDS = ['id', 'cuaderno', 'pagina_pdf', 'dimension', 'descripcion', 'texto_fuente'];
const ID_RE = /^[a-z0-9-]+-p\d{3}-[a-z]$/;

const DEFAULT_ROOT = fileURLToPath(new URL('../../', import.meta.url));

/** Slugs de cuadernos: nombres de archivo de sources/MANIFEST.json sin .pdf. */
export function loadCuadernos(root = DEFAULT_ROOT) {
  const manifest = JSON.parse(readFileSync(`${root}/sources/MANIFEST.json`, 'utf8'));
  return manifest.map((m) => basename(m.file, '.pdf'));
}

const isStr = (v) => typeof v === 'string' && v.trim() !== '';
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function checkShape(o, fields, errors) {
  for (const f of fields) if (!(f in o)) errors.push(`falta el campo ${f}`);
  for (const k of Object.keys(o)) if (!fields.includes(k)) errors.push(`campo desconocido ${k}`);
}
function checkStr(o, k, errors) {
  if (k in o && !isStr(o[k])) errors.push(`${k} debe ser un texto no vacío`);
}
function checkEnum(o, k, values, errors) {
  if (k in o && !values.includes(o[k])) errors.push(`${k} debe ser uno de: ${values.join(', ')}`);
}
function checkPage(o, errors) {
  if ('pagina_pdf' in o && !(Number.isInteger(o.pagina_pdf) && o.pagina_pdf > 0))
    errors.push('pagina_pdf debe ser un entero positivo');
}

export function validateFicha(f, opts = {}) {
  if (!isObj(f)) return ['la ficha debe ser un objeto'];
  const cuadernos = opts.cuadernos ?? loadCuadernos(opts.root);
  const e = [];
  checkShape(f, FICHA_FIELDS, e);
  for (const k of ['id', 'cuaderno', 'subarea', 'titulo', 'objetivo', 'instruccion_padre', 'variante_sin_lamina',
    'senal_logro', 'texto_fuente']) checkStr(f, k, e);
  checkPage(f, e);
  checkEnum(f, 'cuaderno', cuadernos, e);
  checkEnum(f, 'anio_vida', ANIO_VIDA, e);
  checkEnum(f, 'dimension', DIMENSIONES, e);
  checkEnum(f, 'soporte', SOPORTES, e);
  checkEnum(f, 'confianza', CONFIANZAS, e);
  if ('pagina_impresa' in f && typeof f.pagina_impresa !== 'string') e.push('pagina_impresa debe ser un texto (puede ser vacío)');
  if ('orden' in f && !Number.isInteger(f.orden)) e.push('orden debe ser un entero');
  if ('duracion_min' in f && !(Number.isInteger(f.duracion_min) && f.duracion_min >= 1 && f.duracion_min <= 5))
    e.push('duracion_min debe ser un entero entre 1 y 5');
  if ('materiales' in f && !(Array.isArray(f.materiales) && f.materiales.every(isStr)))
    e.push('materiales debe ser un array de textos no vacíos');
  if ('metas_relacionadas' in f && !(Array.isArray(f.metas_relacionadas) && f.metas_relacionadas.every(isStr)))
    e.push('metas_relacionadas debe ser un array de ids de meta');
  if (isStr(f.id)) {
    if (!ID_RE.test(f.id)) e.push('id no cumple el formato <cuaderno>-p###-<letra>');
    else {
      if (isStr(f.cuaderno) && !f.id.startsWith(`${f.cuaderno}-p`)) e.push(`id debe empezar por ${f.cuaderno}-p`);
      else if (Number.isInteger(f.pagina_pdf) && f.pagina_pdf > 0) {
        const m = f.id.match(/-p(\d{3})-[a-z]$/);
        if (m[1] !== String(f.pagina_pdf).padStart(3, '0')) e.push('el p### del id debe coincidir con pagina_pdf');
      }
    }
  }
  if (isStr(f.subarea) && /trazo|preescritura|rellenar/i.test(f.subarea) && f.soporte !== 'papel')
    e.push('soporte debe ser "papel" para trazos, preescritura o rellenar');
  return e;
}

export function validateMeta(m, opts = {}) {
  if (!isObj(m)) return ['la meta debe ser un objeto'];
  const e = [];
  checkShape(m, META_FIELDS, e);
  for (const k of ['id', 'descripcion', 'texto_fuente']) checkStr(m, k, e);
  checkPage(m, e);
  checkEnum(m, 'cuaderno', opts.cuadernosMeta ?? CUADERNOS_META, e);
  checkEnum(m, 'dimension', DIMENSIONES, e);
  return e;
}

/**
 * bank: { fichas?: [{file, items}], metas?: {file, items} }
 * Devuelve [{file, index, id, message}].
 */
export function validateBank(bank, opts = {}) {
  const errors = [];
  const push = (file, index, id, message) => errors.push({ file, index, id, message });
  const cuadernos = opts.cuadernos ?? loadCuadernos(opts.root);
  const o = { ...opts, cuadernos };

  const metaIds = new Set();
  const metas = bank.metas;
  if (metas) {
    if (!Array.isArray(metas.items)) push(metas.file, null, undefined, 'el contenido debe ser un array');
    else metas.items.forEach((m, i) => {
      const id = isObj(m) ? m.id : undefined;
      for (const msg of validateMeta(m, o)) push(metas.file, i, id, msg);
      if (isStr(id)) {
        if (metaIds.has(id)) push(metas.file, i, id, `id de meta duplicado: ${id}`);
        metaIds.add(id);
      }
    });
  }

  const seen = new Set();
  for (const { file, items } of bank.fichas ?? []) {
    if (!Array.isArray(items)) { push(file, null, undefined, 'el contenido debe ser un array'); continue; }
    items.forEach((f, i) => {
      const id = isObj(f) ? f.id : undefined;
      for (const msg of validateFicha(f, o)) push(file, i, id, msg);
      if (isStr(id)) {
        if (seen.has(id)) push(file, i, id, `id de ficha duplicado: ${id}`);
        seen.add(id);
      }
      if (metas && isObj(f) && Array.isArray(f.metas_relacionadas))
        for (const mid of f.metas_relacionadas)
          if (isStr(mid) && !metaIds.has(mid)) push(file, i, id, `meta relacionada inexistente: ${mid}`);
    });
  }
  return errors;
}
