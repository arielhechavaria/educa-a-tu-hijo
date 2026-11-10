/**
 * Daily plan selection (pure, deterministic): same fecha and same state always give the same plan.
 *
 * Rules (S3, S8):
 * - 3 to 5 fichas of the active year of life whose durations add up to about `ajustes.duracionMin`.
 * - The main dimension (dimension of the first ficha) differs from the latest earlier plan's,
 *   whenever the active year has another dimension at all (see chooseFirst).
 * - Dimensions are mixed inside a plan when possible.
 * - Never-seen fichas come first, following each cuaderno's `orden` (which also keeps the order
 *   inside every subárea, since a subárea lives inside one cuaderno). The one exception is the
 *   rotation of the main dimension (chooseFirst).
 * - Seen fichas come back after a window that depends on the latest result (see REVIEW_WINDOWS).
 *   Each window has a `readyAfterDays` start and a `dueAfterDays` end taken from the user's ranges:
 *   from `ready` a ficha may fill free room after the new ones; from `due` it goes before new
 *   fichas, so "Todavía no" really returns in 2–3 days even while new fichas remain.
 *   Inside each tier the shorter window goes first (REVIEW_PRIORITY): no, ayuda, solo, saltar.
 * - A due "Todavía no" or "Con ayuda" is added even when the plan already reached the target
 *   minutes (up to MAX_FICHAS), so its window holds on busy days.
 * - While never-seen fichas remain, every plan includes at least one of them (the slot that
 *   completes the minimum), so reviews never stop the progress through the cuadernos; it gives
 *   way only when every slot left is needed by a due "Todavía no".
 */
import { addDays, parseDate } from './dates';
import type { Ajustes, Dimension, Ficha, PlanDia, Registro } from './types';

export const MIN_FICHAS = 3;
export const MAX_FICHAS = 5;

export interface ReviewWindow {
  /** Days after the latest registro from which the ficha may be proposed again. */
  readyAfterDays: number;
  /** Days after the latest registro from which the ficha goes before never-seen fichas. */
  dueAfterDays: number;
}

export type ReviewState = 'no' | 'ayuda' | 'soloOnce' | 'soloTwice' | 'saltar';

export const REVIEW_WINDOWS = {
  /** "Todavía no" -> back in 2–3 days (user's range). */
  no: { readyAfterDays: 2, dueAfterDays: 3 },
  /** "Con ayuda" -> back in 5–7 days (user's range). */
  ayuda: { readyAfterDays: 5, dueAfterDays: 7 },
  /** One "Lo hizo solo" (not specified by the user): a check-in after about 10 days. */
  soloOnce: { readyAfterDays: 10, dueAfterDays: 12 },
  /** "Lo hizo solo" twice in a row -> review about every 3 weeks (user's "~3 semanas"). */
  soloTwice: { readyAfterDays: 21, dueAfterDays: 24 },
  /** "Saltar" is not a result: the ficha may return the next day, after other reviews. */
  saltar: { readyAfterDays: 1, dueAfterDays: 3 },
} as const satisfies Record<ReviewState, ReviewWindow>;

export interface ReviewSchedule {
  state: ReviewState;
  /** Fecha of the latest registro. */
  lastFecha: string;
  readyOn: string;
  dueOn: string;
}

/**
 * Review schedule of one ficha from its registros (any order). Null when it has none.
 * Several registros on the same fecha count as one: the last one in the array wins (a correction).
 * "Saltar" neither counts as a result nor breaks a run of consecutive "Lo hizo solo".
 */
export function reviewSchedule(registros: readonly Registro[]): ReviewSchedule | null {
  const history = collapseByDate(registros);
  const last = history.at(-1);
  if (!last) return null;
  const state = stateOf(history);
  const window = REVIEW_WINDOWS[state];
  return {
    state,
    lastFecha: last.fecha,
    readyOn: addDays(last.fecha, window.readyAfterDays),
    dueOn: addDays(last.fecha, window.dueAfterDays),
  };
}

export interface PlanificarDiaInput {
  /** Local calendar date to plan, YYYY-MM-DD. */
  fecha: string;
  fichas: readonly Ficha[];
  registros: readonly Registro[];
  planes: readonly PlanDia[];
  ajustes: Ajustes;
}

/**
 * Builds the plan for `fecha`. Returns null only when the active year of life has no fichas.
 * Registros and planes dated after `fecha` are ignored; a plan already stored for `fecha`
 * is the caller's business (it should reuse it instead of calling this).
 */
export function planificarDia(input: PlanificarDiaInput): PlanDia | null {
  const today = parseDate(input.fecha);
  const active = input.fichas.filter((f) => f.anio_vida === input.ajustes.anioVida);
  if (active.length === 0) return null;

  const histories = groupHistories(input.registros, active, today);
  const queues = new Map<string, Ficha[]>(); // never-seen fichas per cuaderno, in notebook order
  const reviews: Candidate[] = [];
  const notReady: Candidate[] = [];

  for (const f of active) {
    const schedule = reviewSchedule(histories.get(f.id) ?? []);
    if (!schedule) {
      const queue = queues.get(f.cuaderno) ?? [];
      queue.push(f);
      queues.set(f.cuaderno, queue);
      continue;
    }
    const priority = REVIEW_PRIORITY[schedule.state];
    const readyOn = parseDate(schedule.readyOn);
    const dueOn = parseDate(schedule.dueOn);
    if (today >= dueOn) {
      const keepsWindow = KEEPS_WINDOW.has(schedule.state);
      reviews.push({ ficha: f, tier: Tier.Due, group: priority, keepsWindow, key: [priority, dueOn, ...notebookKey(f)] });
    } else if (today >= readyOn) {
      reviews.push({ ficha: f, tier: Tier.Ready, group: priority, keepsWindow: false, key: [priority, readyOn, ...notebookKey(f)] });
    } else {
      notReady.push({ ficha: f, tier: Tier.NotReady, group: 0, keepsWindow: false, key: [readyOn, ...notebookKey(f)] });
    }
  }
  for (const queue of queues.values()) queue.sort((a, b) => compareKeys(notebookKey(a), notebookKey(b)));
  notReady.sort(compareCandidates);

  // Fichas that are not ready yet only fill the plan when it could not reach the minimum otherwise.
  const newCount = [...queues.values()].reduce((n, q) => n + q.length, 0);
  const missing = MIN_FICHAS - newCount - reviews.length;
  if (missing > 0) reviews.push(...notReady.slice(0, missing));

  const previous = latestPlanBefore(input.planes, today)?.dimensionPrincipal;
  const target = input.ajustes.duracionMin;
  const picked: Ficha[] = [];
  let pickedNew = false;
  let minutes = 0;

  while (picked.length < MAX_FICHAS) {
    const heads = queueHeads(queues);
    // While never-seen fichas remain, the slot that completes the minimum goes to one of them, so
    // reviews never stop the progress through the cuadernos. The only exception: when every slot
    // left is needed by a "Todavía no" whose 2–3 day window ends today, that review keeps the slot.
    const dueNo = reviews.filter((c) => c.tier === Tier.Due && c.group === REVIEW_PRIORITY.no).length;
    const needsNew =
      picked.length === MIN_FICHAS - 1 && heads.length > 0 && !pickedNew && dueNo < MAX_FICHAS - picked.length;
    const available = (needsNew ? heads : [...reviews, ...heads]).sort(compareCandidates);
    if (available.length === 0) break;
    const next = picked.length === 0 ? chooseFirst(available, previous, queues, notReady) : chooseNext(available, picked);
    // Past the minimum, a ficha is added only while it brings the total closer to the target,
    // except a due "Todavía no" or "Con ayuda": those keep the user's window even if the plan
    // then runs a few minutes longer (never beyond MAX_FICHAS).
    if (picked.length >= MIN_FICHAS && !next.keepsWindow && !bringsCloser(minutes, next.ficha.duracion_min, target)) break;
    picked.push(next.ficha);
    minutes += next.ficha.duracion_min;
    if (next.tier === Tier.New) {
      const queue = queues.get(next.ficha.cuaderno)!;
      queue.splice(queue.indexOf(next.ficha), 1);
      pickedNew = true;
    }
    for (const list of [reviews, notReady]) {
      const i = list.indexOf(next);
      if (i >= 0) list.splice(i, 1);
    }
  }

  return { fecha: input.fecha, fichaIds: picked.map((f) => f.id), dimensionPrincipal: picked[0].dimension };
}

/** Priority tiers, lowest number first. */
const Tier = { Due: 0, New: 1, Ready: 2, NotReady: 3 } as const;
type Tier = (typeof Tier)[keyof typeof Tier];

/**
 * Order of seen fichas inside the Due and Ready tiers, before their dates: the shorter the window
 * the user asked for, the sooner. So a fresh "Todavía no" goes before a "Lo hizo solo" that has
 * been waiting longer, and "Saltar" (not a result) goes last.
 */
const REVIEW_PRIORITY = { no: 0, ayuda: 1, soloOnce: 2, soloTwice: 3, saltar: 4 } as const satisfies Record<ReviewState, number>;

/** Results whose return window was set by the user (S8): when due, they may extend the plan past the target. */
const KEEPS_WINDOW: ReadonlySet<ReviewState> = new Set<ReviewState>(['no', 'ayuda']);

type Key = readonly (number | string)[];

interface Candidate {
  ficha: Ficha;
  tier: Tier;
  /** Fichas of the same tier and group are interchangeable when mixing dimensions inside a plan. */
  group: number;
  /** Due "Todavía no" / "Con ayuda": added even when the plan already reached the target. */
  keepsWindow: boolean;
  /** Order inside the tier; always ends with the notebook key so ties are fully resolved. */
  key: Key;
}

function notebookKey(f: Ficha): Key {
  return [f.orden, f.cuaderno, f.id];
}

function compareKeys(a: Key, b: Key): number {
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] < b[i]) return -1;
    if (a[i] > b[i]) return 1;
  }
  return a.length - b.length;
}

function compareCandidates(a: Candidate, b: Candidate): number {
  return a.tier - b.tier || compareKeys(a.key, b.key);
}

function newCandidate(f: Ficha): Candidate {
  return { ficha: f, tier: Tier.New, group: 0, keepsWindow: false, key: notebookKey(f) };
}

/** Only the first never-seen ficha of each cuaderno can be taken, so notebook order holds. */
function queueHeads(queues: Map<string, Ficha[]>): Candidate[] {
  const heads: Candidate[] = [];
  for (const queue of queues.values()) {
    const head = queue[0];
    if (head) heads.push(newCandidate(head));
  }
  return heads;
}

/**
 * First ficha: the best one whose dimension differs from the previous plan's main dimension,
 * looking through every tier. When none of them has another dimension (for example sexto, where
 * a single cuaderno is mostly relación con el entorno), the main dimension still rotates:
 * 1. the earliest never-seen ficha of another dimension, even if it is not the head of its
 *    cuaderno (notebook order still holds inside its dimension and its subárea);
 * 2. otherwise the seen ficha of another dimension that will be ready soonest, reviewed early.
 * New fichas go first because an early review would shorten the window of a result (two
 * "Lo hizo solo" on consecutive days would already count as a 3-week review).
 * Falls back to the best ficha when no other dimension exists at all.
 */
function chooseFirst(
  sorted: readonly Candidate[],
  previous: Dimension | undefined,
  queues: Map<string, Ficha[]>,
  notReady: readonly Candidate[],
): Candidate {
  if (!previous) return sorted[0];
  const other = sorted.find((c) => c.ficha.dimension !== previous);
  if (other) return other;
  let earliestNew: Ficha | undefined;
  for (const queue of queues.values()) {
    const f = queue.find((q) => q.dimension !== previous);
    if (f && (!earliestNew || compareKeys(notebookKey(f), notebookKey(earliestNew)) < 0)) earliestNew = f;
  }
  if (earliestNew) return newCandidate(earliestNew);
  return notReady.find((c) => c.ficha.dimension !== previous) ?? sorted[0];
}

/** Next fichas: inside the best tier and group, prefer a dimension not yet in the plan. */
function chooseNext(sorted: readonly Candidate[], picked: readonly Ficha[]): Candidate {
  const used = new Set(picked.map((f) => f.dimension));
  const best = sorted[0];
  return sorted.find((c) => c.tier === best.tier && c.group === best.group && !used.has(c.ficha.dimension)) ?? best;
}

/** True when adding `duration` leaves the total no further from the target than it is now. */
function bringsCloser(minutes: number, duration: number, target: number): boolean {
  return minutes < target && minutes + duration - target <= target - minutes;
}

function latestPlanBefore(planes: readonly PlanDia[], today: number): PlanDia | undefined {
  let latest: PlanDia | undefined;
  let latestDay = -Infinity;
  for (const p of planes) {
    const day = parseDate(p.fecha);
    if (day < today && day > latestDay) {
      latest = p;
      latestDay = day;
    }
  }
  return latest;
}

/** Registros of active fichas up to `today`, grouped by ficha. */
function groupHistories(registros: readonly Registro[], active: readonly Ficha[], today: number): Map<string, Registro[]> {
  const activeIds = new Set(active.map((f) => f.id));
  const histories = new Map<string, Registro[]>();
  for (const r of registros) {
    if (!activeIds.has(r.fichaId) || parseDate(r.fecha) > today) continue;
    const list = histories.get(r.fichaId) ?? [];
    list.push(r);
    histories.set(r.fichaId, list);
  }
  return histories;
}

/** One registro per fecha (the last one given for that fecha), oldest first. */
function collapseByDate(registros: readonly Registro[]): Registro[] {
  const byDate = new Map<number, Registro>();
  for (const r of registros) byDate.set(parseDate(r.fecha), r);
  return [...byDate.entries()].sort((a, b) => a[0] - b[0]).map(([, r]) => r);
}

function stateOf(history: readonly Registro[]): ReviewState {
  const last = history[history.length - 1].resultado;
  if (last !== 'solo') return last;
  let soloSeguidos = 0; // consecutive "Lo hizo solo" results, ignoring "Saltar"
  for (let i = history.length - 1; i >= 0; i--) {
    const { resultado } = history[i];
    if (resultado === 'saltar') continue;
    if (resultado !== 'solo') break;
    soloSeguidos++;
  }
  return soloSeguidos >= 2 ? 'soloTwice' : 'soloOnce';
}
