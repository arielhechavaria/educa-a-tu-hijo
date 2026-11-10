export interface EstadoTemporizador {
  restanteSeg: number;
  /** Seconds past the target; the timer keeps counting and never cuts the session. */
  excedidoSeg: number;
  terminado: boolean;
}

export function estadoTemporizador(inicioMs: number, ahoraMs: number, duracionMin: number): EstadoTemporizador {
  const total = duracionMin * 60;
  const transcurrido = Math.max(0, Math.floor((ahoraMs - inicioMs) / 1000));
  const restanteSeg = Math.max(0, total - transcurrido);
  return { restanteSeg, excedidoSeg: Math.max(0, transcurrido - total), terminado: transcurrido >= total };
}

export function formatoMMSS(seg: number): string {
  const s = Math.max(0, Math.floor(seg));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}

/** A stored timer start is valid only if it is a past-or-now instant on the same local date as `ahoraMs`. */
export function inicioVigente(inicioMs: number, ahoraMs: number): boolean {
  if (!Number.isFinite(inicioMs) || inicioMs > ahoraMs) return false;
  const a = new Date(inicioMs);
  const b = new Date(ahoraMs);
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
