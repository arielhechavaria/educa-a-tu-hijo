import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const CLI = join(dirname(fileURLToPath(import.meta.url)), 'cli.mjs');
const good = {
  id: 'patrones-sensoriales-p012-a', cuaderno: 'patrones-sensoriales', pagina_pdf: 12, pagina_impresa: '10',
  anio_vida: 'quinto', dimension: 'relacion_entorno', subarea: 'color', orden: 12, titulo: 't', objetivo: 'o',
  materiales: ['x'], soporte: 'objetos', duracion_min: 3, instruccion_padre: 'i', variante_sin_lamina: 'v',
  senal_logro: 's', metas_relacionadas: [], texto_fuente: 'x', confianza: 'alta',
};

async function root(files = {}) {
  const r = await mkdtemp(join(tmpdir(), 'val-'));
  await mkdir(join(r, 'sources/pdf'), { recursive: true });
  await mkdir(join(r, 'content/actividades'), { recursive: true });
  await writeFile(join(r, 'sources/MANIFEST.json'), JSON.stringify([{ file: 'sources/pdf/patrones-sensoriales.pdf' }]));
  for (const [p, c] of Object.entries(files)) await writeFile(join(r, p), typeof c === 'string' ? c : JSON.stringify(c));
  return r;
}
const run = (r) => spawnSync('node', [CLI, '--root', r], { encoding: 'utf8' });

test('directorio vacio: exit 0', async () => assert.equal(run(await root()).status, 0));
test('sin content: exit 0', async () => {
  const r = await mkdtemp(join(tmpdir(), 'val-'));
  await mkdir(join(r, 'sources'), { recursive: true });
  await writeFile(join(r, 'sources/MANIFEST.json'), '[]');
  assert.equal(run(r).status, 0);
});
test('fichas validas: exit 0', async () =>
  assert.equal(run(await root({ 'content/actividades/a.json': [good] })).status, 0));
test('ficha invalida: exit 1 y formato file[index] id: message', async () => {
  const r = run(await root({ 'content/actividades/a.json': [good, { ...good, id: 'x', duracion_min: 9 }] }));
  assert.equal(r.status, 1);
  assert.match(r.stdout + r.stderr, /a\.json\[1\] x: .*duracion_min/);
});
test('JSON roto: exit 1', async () =>
  assert.equal(run(await root({ 'content/actividades/a.json': '{oops' })).status, 1));
test('meta inexistente referenciada: exit 1', async () => {
  const r = run(await root({
    'content/actividades/a.json': [{ ...good, metas_relacionadas: ['nope'] }],
    'content/metas.json': [],
  }));
  assert.equal(r.status, 1);
  assert.match(r.stdout + r.stderr, /nope/);
});
test('meta con cuaderno no permitido: exit 1', async () => {
  const m = { id: 'm-01', cuaderno: 'patrones-sensoriales', pagina_pdf: 4, dimension: 'relacion_entorno', descripcion: 'd', texto_fuente: 't' };
  const r = run(await root({ 'content/metas.json': [m] }));
  assert.equal(r.status, 1);
});
