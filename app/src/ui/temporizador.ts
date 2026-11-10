import { estadoTemporizador, formatoMMSS, inicioVigente } from '../core/timer';
import { app } from './state';
import { h } from './dom';

const KEY = 'temporizador-inicio';
let inicio: number | null = null;
let avisado = false;
let tick: number | undefined;

try {
  const v = localStorage.getItem(KEY);
  if (v) {
    const n = Number(v);
    if (inicioVigente(n, Date.now())) inicio = n;
    else localStorage.removeItem(KEY);
  }
} catch { /* storage unavailable: timer lives in memory only */ }

export const corriendo = () => inicio !== null;

export function empezar(): void {
  inicio = Date.now();
  avisado = false;
  try { localStorage.setItem(KEY, String(inicio)); } catch { /* ignore */ }
  actualizar();
}

let alDetener: () => void = () => {};
/** Registered by main to re-render the current view (avoids a circular import with views). */
export const setAlDetener = (f: () => void) => { alDetener = f; };

export function detener(): void {
  inicio = null;
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
  actualizar();
  alDetener();
}

/** Always-visible bar; shows the countdown, warns at the end and keeps counting (never cuts). */
export const barra = h('div', { class: 'timer', hidden: true, role: 'timer', 'aria-live': 'off' });

export function actualizar(): void {
  window.clearInterval(tick);
  if (inicio === null) { barra.hidden = true; barra.replaceChildren(); return; }
  const pintar = () => {
    if (inicio === null) return;
    const e = estadoTemporizador(inicio, Date.now(), app.progreso.ajustes.duracionMin);
    barra.hidden = false;
    barra.classList.toggle('timer--fin', e.terminado);
    barra.replaceChildren(
      h('span', { class: 'timer__tiempo' }, e.terminado ? `+${formatoMMSS(e.excedidoSeg)}` : formatoMMSS(e.restanteSeg)),
      h('span', { class: 'timer__texto' }, e.terminado ? `Ya pasaron los ${app.progreso.ajustes.duracionMin} minutos. Pueden seguir si quieren.` : 'Tiempo de hoy'),
      h('button', { class: 'btn btn--chico', onclick: detener }, 'Terminar'),
    );
    if (e.terminado && !avisado) {
      avisado = true;
      try { navigator.vibrate?.([300, 150, 300]); } catch { /* ignore */ }
    }
  };
  pintar();
  tick = window.setInterval(pintar, 1000);
}
