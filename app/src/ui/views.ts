import { NOMBRE_DIMENSION, TEXTO_RESULTADO, resumenSemana } from '../core/semana';
import type { Resultado } from '../core/types';
import { exportarJSON, importarJSON } from '../data/exportImport';
import { actualizarAjustes } from '../data/progress';
import { h } from './dom';
import { app, descartarPlanDeHoy, fechaLocal, fichaPorId, persistir, planDeHoy, registrar, resultadoDeHoy } from './state';
import { corriendo, empezar } from './temporizador';

type Vista = HTMLElement | Promise<HTMLElement>;

const volver = () => { location.hash = '#/hoy'; };

export async function hoy(): Promise<HTMLElement> {
  const plan = await planDeHoy();
  const raiz = h('section', {}, h('h1', {}, 'Hoy'));
  if (!plan) return (raiz.append(h('p', {}, 'No hay fichas para este año de vida.')), raiz);
  const total = plan.fichaIds.reduce((s, id) => s + (fichaPorId(id)?.duracion_min ?? 0), 0);
  raiz.append(h('p', { class: 'sub' }, `${plan.fichaIds.length} actividades · unos ${total} minutos`));
  const lista = h('ol', { class: 'lista' });
  for (const id of plan.fichaIds) {
    const f = fichaPorId(id);
    if (!f) continue;
    const r = resultadoDeHoy(id);
    lista.append(h('li', {}, h('a', { class: 'tarjeta', href: `#/ficha/${f.id}` },
      h('span', { class: 'tarjeta__dim' }, NOMBRE_DIMENSION[f.dimension]),
      h('strong', {}, f.titulo),
      h('span', { class: 'tarjeta__min' }, `${f.duracion_min} min${r ? ` · ${TEXTO_RESULTADO[r]}` : ''}`))));
  }
  raiz.append(lista);
  if (!corriendo()) raiz.append(h('div', { class: 'accion' }, h('button', { class: 'btn btn--grande', onclick: () => { empezar(); rerender(); } }, 'Empezar')));
  return raiz;
}

const BOTONES: [Resultado, string][] = [['solo', 'Lo hizo solo'], ['ayuda', 'Con ayuda'], ['no', 'Todavía no'], ['saltar', 'Saltar']];

export function ficha(id: string): HTMLElement {
  const f = fichaPorId(id);
  if (!f) return h('section', {}, h('p', {}, 'No encuentro esta ficha.'), h('a', { href: '#/hoy', class: 'btn' }, 'Volver'));
  const actual = resultadoDeHoy(id);
  return h('section', {},
    h('a', { href: '#/hoy', class: 'atras' }, '← Hoy'),
    h('span', { class: 'tarjeta__dim' }, `${NOMBRE_DIMENSION[f.dimension]} · ${f.duracion_min} min`),
    h('h1', {}, f.titulo),
    h('h2', {}, 'Qué hacer'), h('p', {}, f.instruccion_padre),
    h('h2', {}, 'Materiales'), h('ul', {}, ...f.materiales.map((m) => h('li', {}, m))),
    h('h2', {}, 'Sin la lámina'), h('p', {}, f.variante_sin_lamina),
    h('h2', {}, 'Qué observar'), h('p', {}, f.senal_logro),
    h('a', { class: 'btn', href: `#/lamina/${f.id}` }, 'Ver lámina'),
    h('div', { class: 'registro registro--fijo' }, ...BOTONES.map(([r, t]) =>
      h('button', { class: `btn${actual === r ? ' btn--sel' : ''}`, onclick: async () => { await registrar(f.id, r); volver(); } }, t))));
}

export async function lamina(id: string): Promise<HTMLElement> {
  const f = fichaPorId(id);
  if (!f) return h('p', {}, 'No encuentro esta ficha.');
  const canvas = h('canvas', { class: 'lamina' });
  const estado = h('span', {}, 'Cargando…');
  const caja = h('div', { class: 'lamina-caja' }, canvas);
  let pagina = f.pagina_pdf;
  let ampliado = false;
  const pdfjs = await import('pdfjs-dist');
  const worker = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjs.GlobalWorkerOptions.workerSrc = worker;
  const doc = await pdfjs.getDocument({ url: `${import.meta.env.BASE_URL}pdf/${f.cuaderno}.pdf` }).promise;
  let tarea: { cancel(): void; promise: Promise<unknown> } | undefined;
  const pintar = async () => {
    tarea?.cancel();
    const p = await doc.getPage(pagina);
    const base = p.getViewport({ scale: 1 });
    const ancho = (caja.clientWidth || window.innerWidth) * (ampliado ? 2 : 1);
    const dpr = window.devicePixelRatio || 1;
    const vp = p.getViewport({ scale: (ancho / base.width) * dpr });
    canvas.width = vp.width; canvas.height = vp.height;
    canvas.style.width = `${ancho}px`;
    estado.textContent = `Página ${pagina} de ${doc.numPages}`;
    canvas.dataset.pagina = String(pagina);
    tarea = p.render({ canvasContext: canvas.getContext('2d')!, canvas, viewport: vp });
    try { await tarea.promise; } catch { /* cancelled by a newer render */ }
  };
  const ir = (d: number) => () => { pagina = Math.min(doc.numPages, Math.max(1, pagina + d)); void pintar(); };
  const raiz = h('section', { class: 'visor' },
    h('a', { href: `#/ficha/${f.id}`, class: 'atras' }, '← Ficha'), estado, caja,
    h('div', { class: 'registro' },
      h('button', { class: 'btn', onclick: ir(-1) }, 'Anterior'),
      h('button', { class: 'btn', onclick: ir(1) }, 'Siguiente'),
      h('button', { class: 'btn', onclick: () => { ampliado = !ampliado; void pintar(); } }, 'Ampliar')));
  queueMicrotask(() => void pintar());
  return raiz;
}

export function semana(): HTMLElement {
  const { texto } = resumenSemana({ fichas: app.fichas, registros: app.progreso.registros, hasta: fechaLocal() });
  const aviso = h('p', { class: 'sub', 'aria-live': 'polite' });
  const compartir = async () => {
    try {
      if (navigator.share) { await navigator.share({ text: texto }); return; }
      await navigator.clipboard.writeText(texto);
      aviso.textContent = 'Texto copiado.';
    } catch { aviso.textContent = 'No se pudo compartir. Puedes seleccionar el texto y copiarlo.'; }
  };
  return h('section', {}, h('h1', {}, 'Semana'), h('pre', { class: 'resumen' }, texto),
    h('button', { class: 'btn', onclick: compartir }, 'Compartir como texto'), aviso);
}

export function ajustes(): HTMLElement {
  const a = app.progreso.ajustes;
  const aviso = h('p', { class: 'sub', 'aria-live': 'polite' });
  const cambiar = async (parcial: Partial<typeof a>) => {
    try { const cambioAnio = parcial.anioVida !== undefined && parcial.anioVida !== app.progreso.ajustes.anioVida;
      await persistir(actualizarAjustes(app.progreso, parcial));
      if (cambioAnio) await descartarPlanDeHoy();
      aviso.textContent = cambioAnio ? 'Guardado. El plan de hoy se rehace.' : 'Guardado.'; }
    catch (e) { aviso.textContent = (e as Error).message; }
  };
  const año = h('select', { class: 'campo', onchange: (e) => void cambiar({ anioVida: (e.target as HTMLSelectElement).value as 'quinto' | 'sexto' }) },
    h('option', { value: 'quinto', selected: a.anioVida === 'quinto' }, 'Quinto año (4–5 años)'),
    h('option', { value: 'sexto', selected: a.anioVida === 'sexto' }, 'Sexto año (5–6 años)'));
  const dur = h('input', { class: 'campo', type: 'number', min: '5', max: '30', value: String(a.duracionMin), inputmode: 'numeric',
    onchange: (e) => void cambiar({ duracionMin: Number((e.target as HTMLInputElement).value) }) });
  const caja = h('textarea', { class: 'campo', rows: '6', placeholder: 'Aquí aparece el progreso exportado, o pega uno para importar.' });
  const exportar = () => { caja.value = exportarJSON(app.progreso); aviso.textContent = 'Listo. Copia el texto o descárgalo.'; };
  const copiar = async () => { try { await navigator.clipboard.writeText(caja.value); aviso.textContent = 'Copiado.'; } catch { aviso.textContent = 'No se pudo copiar.'; } };
  const descargar = () => {
    const url = URL.createObjectURL(new Blob([caja.value || exportarJSON(app.progreso)], { type: 'application/json' }));
    h('a', { href: url, download: `educa-a-tu-hijo-${fechaLocal()}.json` }).click();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  };
  const importar = async (texto: string) => {
    if (!window.confirm('Esto reemplaza todo el progreso actual. ¿Continuar?')) return;
    try { await persistir(importarJSON(texto)); rerender(); }
    catch (e) { aviso.textContent = (e as Error).message; }
  };
  const archivo = h('input', { type: 'file', accept: 'application/json,.json', class: 'campo',
    onchange: async (e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) await importar(await f.text()); } });
  return h('section', {}, h('h1', {}, 'Ajustes'),
    h('label', {}, 'Año de vida activo', año), h('label', {}, 'Minutos por día', dur),
    h('h2', {}, 'Progreso'), caja,
    h('div', { class: 'registro' },
      h('button', { class: 'btn', onclick: exportar }, 'Exportar'), h('button', { class: 'btn', onclick: copiar }, 'Copiar'),
      h('button', { class: 'btn', onclick: descargar }, 'Descargar'),
      h('button', { class: 'btn', onclick: () => void importar(caja.value) }, 'Importar texto')),
    h('label', {}, 'Importar desde archivo', archivo), aviso);
}

export const rutas: Record<string, (arg: string) => Vista> = { hoy, ficha, lamina, semana, ajustes };
let rerender: () => void = () => {};
export const setRerender = (f: () => void) => { rerender = f; };
