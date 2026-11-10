#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateBank, loadCuadernos } from './schema.mjs';

const argv = process.argv.slice(2);
const ri = argv.indexOf('--root');
const root = resolve(ri >= 0 ? argv[ri + 1] : fileURLToPath(new URL('../../', import.meta.url)));

const errors = [];
const readJson = async (path, label) => {
  try {
    return JSON.parse(await readFile(path, 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return undefined;
    errors.push({ file: label, index: null, message: `JSON ilegible: ${err.message}` });
    return null;
  }
};

const bank = { fichas: [] };
let names = [];
try {
  names = (await readdir(join(root, 'content/actividades'))).filter((n) => n.endsWith('.json')).sort();
} catch (err) {
  if (err.code !== 'ENOENT') throw err;
}
for (const n of names) {
  const label = `content/actividades/${n}`;
  const items = await readJson(join(root, label), label);
  if (items !== null && items !== undefined) bank.fichas.push({ file: label, items });
}
const metas = await readJson(join(root, 'content/metas.json'), 'content/metas.json');
if (metas !== null && metas !== undefined) bank.metas = { file: 'content/metas.json', items: metas };

errors.push(...validateBank(bank, { cuadernos: loadCuadernos(root) }));

for (const e of errors) {
  const where = e.index === null || e.index === undefined ? e.file : `${e.file}[${e.index}]`;
  console.log(`${where}${e.id ? ` ${e.id}` : ''}: ${e.message}`);
}
if (errors.length) {
  console.log(`${errors.length} error(es)`);
  process.exit(1);
}
console.log(`OK: ${bank.fichas.length} archivo(s) de fichas${bank.metas ? ' y metas' : ''} validados`);
