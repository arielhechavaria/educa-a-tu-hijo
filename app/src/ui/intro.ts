import { debeMostrarIntro, marcarIntroVista } from '../data/intro';
import { preferencesStore } from '../data/storage';
import { h } from './dom';

const VIDEO = 'intro/educa-a-tu-hijo.mp4';

/** Full-screen intro video. Skipping or finishing both mark it as seen. */
export function abrirIntro(): Promise<void> {
  return new Promise((resolve) => {
    const video = h('video', { class: 'intro__video', src: VIDEO, controls: true, playsinline: true, preload: 'metadata' });
    const cerrar = () => {
      video.pause();
      capa.remove();
      void marcarIntroVista(preferencesStore);
      resolve();
    };
    const saltar = h('button', { class: 'btn intro__saltar', onclick: cerrar }, 'Saltar');
    const capa = h('div', { class: 'intro', role: 'dialog', 'aria-label': 'Introducción' },
      h('h1', {}, 'Educa a tu Hijo'),
      h('p', { class: 'sub' }, 'Un video corto para empezar. Puedes saltarlo.'),
      video, saltar);
    video.addEventListener('ended', cerrar);
    video.addEventListener('error', () => { saltar.textContent = 'Continuar'; });
    document.body.append(capa);
  });
}

export async function introSiCorresponde(): Promise<void> {
  if (await debeMostrarIntro(preferencesStore)) await abrirIntro();
}
