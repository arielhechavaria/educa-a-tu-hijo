#!/usr/bin/env node
// Reproducible asset pipeline: merges fichas, copies metas, compresses the PDFs
// of the cuadernos that appear in the fichas (page numbers preserved).
// Usage: npm run assets   (from app/)  or  node app/scripts/build-assets.mjs
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = fileURLToPath(new URL('../../', import.meta.url));
const OUT_CONTENT = join(ROOT, 'app/public/content');
const OUT_PDF = join(ROOT, 'app/public/pdf');
const BUDGET_BYTES = 55 * 1024 * 1024;

/** Ghostscript preset. Colour is preserved (no grayscale): the láminas are coloured. */
export const GS_SETTING = '/ebook';

export function mergeFichas(fichas) {
  return [...fichas].sort((a, b) => a.cuaderno.localeCompare(b.cuaderno) || a.orden - b.orden || a.id.localeCompare(b.id));
}

function gsPageCount(file) {
  const out = execFileSync('gs', ['-q', '-dNODISPLAY', '-dNOSAFER', '-c',
    `(${file}) (r) file runpdfbegin pdfpagecount = quit`], { encoding: 'utf8' });
  return Number(out.trim());
}

const mb = (n) => (n / 1024 / 1024).toFixed(2).padStart(8);

async function main() {
  const { validateFicha, loadCuadernos } = await import(pathToFileURL(join(ROOT, 'scripts/validate/schema.mjs')).href);
  const cuadernos = loadCuadernos(ROOT);

  // 1. fichas + metas
  const dir = join(ROOT, 'content/actividades');
  const fichas = [];
  const errors = [];
  for (const f of readdirSync(dir).filter((n) => n.endsWith('.json')).sort()) {
    for (const ficha of JSON.parse(readFileSync(join(dir, f), 'utf8'))) {
      const e = validateFicha(ficha, { cuadernos, root: ROOT });
      if (e.length) errors.push(`${f} ${ficha.id ?? '?'}: ${e.join('; ')}`);
      fichas.push(ficha);
    }
  }
  const ids = new Set();
  for (const f of fichas) {
    if (ids.has(f.id)) errors.push(`duplicate id ${f.id}`);
    ids.add(f.id);
  }
  if (errors.length) {
    console.error(`Validation failed (${errors.length} errors):\n${errors.join('\n')}`);
    process.exit(1);
  }
  mkdirSync(OUT_CONTENT, { recursive: true });
  const sorted = mergeFichas(fichas);
  writeFileSync(join(OUT_CONTENT, 'fichas.json'), JSON.stringify(sorted, null, 2) + '\n');
  copyFileSync(join(ROOT, 'content/metas.json'), join(OUT_CONTENT, 'metas.json'));

  // 2. PDFs only for cuadernos used by fichas
  mkdirSync(OUT_PDF, { recursive: true });
  const used = [...new Set(sorted.map((f) => f.cuaderno))].sort();
  const rows = [];
  for (const c of used) {
    const src = join(ROOT, 'sources/pdf', `${c}.pdf`);
    const dst = join(OUT_PDF, `${c}.pdf`);
    const tmp = join(OUT_PDF, `${c}.tmp.pdf`);
    if (!existsSync(src)) throw new Error(`missing source PDF ${src} (git lfs pull?)`);
    execFileSync('gs', ['-q', '-dNOPAUSE', '-dBATCH', '-dSAFER', '-sDEVICE=pdfwrite', '-dCompatibilityLevel=1.5',
      `-dPDFSETTINGS=${GS_SETTING}`, '-dColorConversionStrategy=/LeaveColorUnchanged', `-sOutputFile=${tmp}`, src],
    { stdio: ['ignore', 'inherit', 'inherit'] });
    // Never ship something larger than the original.
    const kept = statSync(tmp).size < statSync(src).size ? tmp : src;
    if (kept === tmp) renameSync(tmp, dst); else { rmSync(tmp); copyFileSync(src, dst); }
    const pagesIn = gsPageCount(src);
    const pagesOut = gsPageCount(dst);
    if (pagesIn !== pagesOut) throw new Error(`${c}: page count changed ${pagesIn} -> ${pagesOut}`);
    const maxPage = Math.max(...sorted.filter((f) => f.cuaderno === c).map((f) => f.pagina_pdf));
    if (maxPage > pagesOut) throw new Error(`${c}: ficha points to page ${maxPage} but PDF has ${pagesOut}`);
    rows.push({ c, orig: statSync(src).size, out: statSync(dst).size, pages: pagesOut, how: kept === tmp ? GS_SETTING : 'original' });
  }

  // 3. size table
  console.log(`\nfichas: ${sorted.length}  cuadernos: ${used.length}  gs setting: ${GS_SETTING}`);
  console.log('cuaderno'.padEnd(26) + 'pages'.padStart(6) + 'orig MB'.padStart(10) + 'out MB'.padStart(10) + '  how');
  for (const r of rows) console.log(r.c.padEnd(26) + String(r.pages).padStart(6) + mb(r.orig) + ' ' + mb(r.out) + '  ' + r.how);
  const total = [...readdirSync(OUT_PDF).map((n) => join(OUT_PDF, n)), join(OUT_CONTENT, 'fichas.json'), join(OUT_CONTENT, 'metas.json')]
    .reduce((s, f) => s + statSync(f).size, 0);
  console.log('TOTAL public pdf+content'.padEnd(42) + mb(total) + ' MB');
  if (total > BUDGET_BYTES) { console.error(`Over budget (${BUDGET_BYTES} bytes)`); process.exit(1); }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
