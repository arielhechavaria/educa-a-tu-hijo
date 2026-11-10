import { describe, expect, it } from 'vitest';
import { estadoTemporizador, formatoMMSS, inicioVigente } from './timer';

describe('temporizador', () => {
  it('counts down from the full duration', () => {
    expect(estadoTemporizador(0, 0, 10)).toEqual({ restanteSeg: 600, excedidoSeg: 0, terminado: false });
    expect(estadoTemporizador(0, 125_000, 10)).toMatchObject({ restanteSeg: 475, terminado: false });
  });
  it('flags the end but keeps counting past it (does not cut)', () => {
    expect(estadoTemporizador(0, 600_000, 10)).toEqual({ restanteSeg: 0, excedidoSeg: 0, terminado: true });
    expect(estadoTemporizador(0, 672_000, 10)).toEqual({ restanteSeg: 0, excedidoSeg: 72, terminado: true });
  });
  it('tolerates a clock that went backwards', () => {
    expect(estadoTemporizador(10_000, 5_000, 10).restanteSeg).toBe(600);
  });
  it('formats mm:ss', () => {
    expect(formatoMMSS(600)).toBe('10:00');
    expect(formatoMMSS(65)).toBe('01:05');
    expect(formatoMMSS(0)).toBe('00:00');
  });
});

describe('inicioVigente', () => {
  const ahora = new Date(2026, 10, 10, 15, 0).getTime();
  it('accepts a start from earlier today', () => {
    expect(inicioVigente(new Date(2026, 10, 10, 8, 0).getTime(), ahora)).toBe(true);
  });
  it('rejects a start from a previous day', () => {
    expect(inicioVigente(new Date(2026, 10, 9, 23, 59).getTime(), ahora)).toBe(false);
  });
  it('rejects invalid or future values', () => {
    expect(inicioVigente(NaN, ahora)).toBe(false);
    expect(inicioVigente(ahora + 60_000, ahora)).toBe(false);
  });
});
