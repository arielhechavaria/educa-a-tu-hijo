import { agregarRegistro, guardarPlan } from '../data/progress';
import { cargar, guardar } from '../data/storage';
import { planificarDia } from '../core/scheduler';
import { crearProgresoVacio } from '../data/progress';
import type { Ficha, PlanDia, Progreso, Resultado } from '../core/types';

export const app: { fichas: Ficha[]; progreso: Progreso } = { fichas: [], progreso: crearProgresoVacio() };

export function fechaLocal(d = new Date()): string {
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export async function iniciar(): Promise<void> {
  const res = await fetch(`${import.meta.env.BASE_URL}content/fichas.json`);
  app.fichas = (await res.json()) as Ficha[];
  app.progreso = await cargar();
}

export async function persistir(p: Progreso): Promise<void> {
  app.progreso = p;
  await guardar(p);
}

export function fichaPorId(id: string): Ficha | undefined {
  return app.fichas.find((f) => f.id === id);
}

/** Today's plan: reuse the stored one, or generate and store it so it stays stable all day. */
export async function planDeHoy(): Promise<PlanDia | null> {
  const fecha = fechaLocal();
  const guardado = app.progreso.planes.find((p) => p.fecha === fecha);
  if (guardado) return guardado;
  const plan = planificarDia({ fecha, fichas: app.fichas, registros: app.progreso.registros, planes: app.progreso.planes, ajustes: app.progreso.ajustes });
  if (plan) await persistir(guardarPlan(app.progreso, plan));
  return plan;
}

export async function descartarPlanDeHoy(): Promise<void> {
  const fecha = fechaLocal();
  await persistir({ ...app.progreso, planes: app.progreso.planes.filter((p) => p.fecha !== fecha) });
}

export async function registrar(fichaId: string, resultado: Resultado): Promise<void> {
  await persistir(agregarRegistro(app.progreso, { fichaId, fecha: fechaLocal(), resultado }));
}

export function resultadoDeHoy(fichaId: string): Resultado | undefined {
  const fecha = fechaLocal();
  return app.progreso.registros.find((r) => r.fichaId === fichaId && r.fecha === fecha)?.resultado;
}
