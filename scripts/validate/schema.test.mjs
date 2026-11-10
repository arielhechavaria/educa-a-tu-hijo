import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateFicha, validateMeta, validateBank } from './schema.mjs';

const CUADERNOS = ['patrones-sensoriales', 'pre-escritura', 'diagnostico-egreso-5-6', 'tareas-diagnosticas-preescolar'];
const opts = { cuadernos: CUADERNOS };

const ficha = (o = {}) => ({
  id: 'patrones-sensoriales-p012-a', cuaderno: 'patrones-sensoriales', pagina_pdf: 12, pagina_impresa: '10',
  anio_vida: 'quinto', dimension: 'relacion_entorno', subarea: 'color', orden: 12, titulo: 't', objetivo: 'o',
  materiales: ['lápiz'], soporte: 'objetos', duracion_min: 3, instruccion_padre: 'i', variante_sin_lamina: 'v',
  senal_logro: 's', metas_relacionadas: [], texto_fuente: 'x', confianza: 'alta', ...o,
});
const meta = (o = {}) => ({
  id: 'egreso-relacion-entorno-01', cuaderno: 'diagnostico-egreso-5-6', pagina_pdf: 4, dimension: 'relacion_entorno',
  descripcion: 'd', texto_fuente: 't', ...o,
});
const has = (errs, re) => errs.some((e) => re.test(e));

test('ficha valida sin errores', () => assert.deepEqual(validateFicha(ficha(), opts), []));
test('no objeto', () => assert.ok(validateFicha(null, opts).length > 0));

for (const k of Object.keys(ficha())) {
  test(`falta campo ${k}`, () => {
    const f = ficha(); delete f[k];
    assert.ok(has(validateFicha(f, opts), new RegExp(k)));
  });
}
test('campo extra', () => assert.ok(has(validateFicha(ficha({ extra: 1 }), opts), /extra/)));

test('duracion_min limites', () => {
  for (const d of [1, 5]) assert.deepEqual(validateFicha(ficha({ duracion_min: d }), opts), []);
  for (const d of [0, 6, 2.5, '3', null]) assert.ok(has(validateFicha(ficha({ duracion_min: d }), opts), /duracion_min/), String(d));
});
test('pagina_pdf entero positivo', () => {
  for (const p of [0, -1, 1.5, '12']) assert.ok(has(validateFicha(ficha({ pagina_pdf: p }), opts), /pagina_pdf/), String(p));
});
test('id formato', () => {
  for (const id of ['Patrones-p012-a', 'patrones-sensoriales-p12-a', 'patrones-sensoriales-p012-ab', 'patrones-sensoriales-p012'])
    assert.ok(has(validateFicha(ficha({ id }), opts), /id/), id);
});
test('id debe empezar por cuaderno-p', () =>
  assert.ok(has(validateFicha(ficha({ id: 'pre-escritura-p012-a' }), opts), /empezar|cuaderno/)));
test('id p### igual a pagina_pdf', () =>
  assert.ok(has(validateFicha(ficha({ id: 'patrones-sensoriales-p013-a' }), opts), /pagina_pdf/)));
test('cuaderno desconocido', () =>
  assert.ok(has(validateFicha(ficha({ cuaderno: 'otro', id: 'otro-p012-a' }), opts), /cuaderno/)));
test('enums', () => {
  for (const [k, v] of [['anio_vida', 'tercero'], ['dimension', 'x'], ['soporte', 'x'], ['confianza', 'x']])
    assert.ok(has(validateFicha(ficha({ [k]: v }), opts), new RegExp(k)), k);
});
test('strings no vacios', () => {
  for (const k of ['subarea', 'titulo', 'objetivo', 'instruccion_padre', 'variante_sin_lamina', 'senal_logro', 'texto_fuente'])
    for (const v of ['', '  ', 5]) assert.ok(has(validateFicha(ficha({ [k]: v }), opts), new RegExp(k)), k);
});
test('pagina_impresa string, puede ser vacia', () => {
  assert.deepEqual(validateFicha(ficha({ pagina_impresa: '' }), opts), []);
  assert.ok(has(validateFicha(ficha({ pagina_impresa: 10 }), opts), /pagina_impresa/));
});
test('materiales', () => {
  assert.ok(has(validateFicha(ficha({ materiales: 'a' }), opts), /materiales/));
  assert.ok(has(validateFicha(ficha({ materiales: [''] }), opts), /materiales/));
  assert.deepEqual(validateFicha(ficha({ materiales: [] }), opts), []);
});
test('metas_relacionadas array', () => {
  assert.ok(has(validateFicha(ficha({ metas_relacionadas: 'm' }), opts), /metas_relacionadas/));
  assert.ok(has(validateFicha(ficha({ metas_relacionadas: [1] }), opts), /metas_relacionadas/));
});
test('subarea trazo/preescritura/rellenar exige papel', () => {
  for (const s of ['Trazos rectos', 'PREESCRITURA', 'rellenar figuras'])
    assert.ok(has(validateFicha(ficha({ subarea: s, soporte: 'pantalla' }), opts), /papel/), s);
  assert.deepEqual(validateFicha(ficha({ subarea: 'trazos', soporte: 'papel' }), opts), []);
});

test('meta valida', () => assert.deepEqual(validateMeta(meta(), opts), []));
test('meta invalida', () => {
  assert.ok(has(validateMeta(meta({ cuaderno: 'pre-escritura' }), opts), /cuaderno/));
  assert.ok(has(validateMeta(meta({ pagina_pdf: 0 }), opts), /pagina_pdf/));
  assert.ok(has(validateMeta(meta({ dimension: 'x' }), opts), /dimension/));
  assert.ok(has(validateMeta(meta({ descripcion: '' }), opts), /descripcion/));
  assert.ok(has(validateMeta(meta({ extra: 1 }), opts), /extra/));
  assert.ok(has(validateMeta(meta({ id: '' }), opts), /id/));
  const m = meta(); delete m.texto_fuente;
  assert.ok(has(validateMeta(m, opts), /texto_fuente/));
});

test('bank: ids de ficha duplicados', () => {
  const r = validateBank({ fichas: [{ file: 'a.json', items: [ficha(), ficha()] }] }, opts);
  assert.ok(r.some((e) => e.index === 1 && /duplicado/.test(e.message)));
});
test('bank: duplicados entre archivos', () => {
  const r = validateBank({ fichas: [{ file: 'a.json', items: [ficha()] }, { file: 'b.json', items: [ficha()] }] }, opts);
  assert.ok(r.some((e) => e.file === 'b.json' && /duplicado/.test(e.message)));
});
test('bank: metas duplicadas', () => {
  const r = validateBank({ metas: { file: 'metas.json', items: [meta(), meta()] } }, opts);
  assert.ok(r.some((e) => e.index === 1 && /duplicado/.test(e.message)));
});
test('bank: meta inexistente solo si hay metas', () => {
  const f = ficha({ metas_relacionadas: ['nope'] });
  assert.deepEqual(validateBank({ fichas: [{ file: 'a.json', items: [f] }] }, opts), []);
  const r = validateBank({ fichas: [{ file: 'a.json', items: [f] }], metas: { file: 'metas.json', items: [meta()] } }, opts);
  assert.ok(r.some((e) => /nope/.test(e.message)));
  const ok = ficha({ metas_relacionadas: ['egreso-relacion-entorno-01'] });
  assert.deepEqual(validateBank({ fichas: [{ file: 'a.json', items: [ok] }], metas: { file: 'metas.json', items: [meta()] } }, opts), []);
});
test('bank: no array', () => {
  const r = validateBank({ fichas: [{ file: 'a.json', items: {} }] }, opts);
  assert.ok(r.length === 1 && /array/.test(r[0].message));
});
test('cuadernos por defecto vienen de MANIFEST.json', () => {
  assert.deepEqual(validateFicha(ficha()), []);
  assert.ok(has(validateFicha(ficha({ cuaderno: 'otro', id: 'otro-p012-a' })), /cuaderno/));
});
