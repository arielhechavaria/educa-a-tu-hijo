import './style.css';
import { h } from './ui/dom';
import { iniciar } from './ui/state';
import { actualizar, barra } from './ui/temporizador';
import { rutas, setRerender } from './ui/views';

const contenido = h('main', { class: 'contenido' });
const tabs = ['hoy', 'semana', 'ajustes'];
const nav = h('nav', { class: 'tabs' }, ...tabs.map((t) => h('a', { href: `#/${t}`, 'data-tab': t }, t[0].toUpperCase() + t.slice(1))));

async function pintar(): Promise<void> {
  const [, nombre = 'hoy', arg = ''] = location.hash.split('/');
  const vista = rutas[nombre] ?? rutas.hoy;
  nav.querySelectorAll('a').forEach((a) => a.classList.toggle('activa', a.dataset.tab === nombre || (nombre === 'ficha' || nombre === 'lamina') && a.dataset.tab === 'hoy'));
  contenido.replaceChildren(h('p', { class: 'sub' }, 'Cargando…'));
  try { contenido.replaceChildren(await vista(decodeURIComponent(arg))); window.scrollTo(0, 0); }
  catch (e) { contenido.replaceChildren(h('p', {}, `Algo falló: ${(e as Error).message}`)); }
}

async function arrancar(): Promise<void> {
  document.getElementById('app')!.append(barra, contenido, nav);
  await iniciar();
  setRerender(() => void pintar());
  window.addEventListener('hashchange', () => void pintar());
  actualizar();
  await pintar();
}
void arrancar();
