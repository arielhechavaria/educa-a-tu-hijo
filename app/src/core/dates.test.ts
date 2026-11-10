import { describe, expect, it } from 'vitest';
import { addDays, daysBetween, formatDate, parseDate } from './dates';

describe('parseDate / formatDate', () => {
  it('round-trips a local calendar date', () => {
    expect(formatDate(parseDate('2026-11-10'))).toBe('2026-11-10');
    expect(parseDate('1970-01-01')).toBe(0);
    expect(parseDate('1970-01-02')).toBe(1);
  });

  it.each(['', '2026-1-1', '2026-13-01', '2026-00-10', '2026-02-30', '2027-02-29', '2026-11-10T00:00', 'abc'])(
    'rejects invalid date %j',
    (value) => {
      expect(() => parseDate(value)).toThrow();
    },
  );

  it('accepts 29 February on a leap year', () => {
    expect(formatDate(parseDate('2028-02-29'))).toBe('2028-02-29');
  });
});

describe('addDays', () => {
  it('crosses the end of a month', () => {
    expect(addDays('2026-01-31', 1)).toBe('2026-02-01');
    expect(addDays('2026-04-30', 1)).toBe('2026-05-01');
  });

  it('crosses the end of a year', () => {
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-12-30', 21)).toBe('2027-01-20');
  });

  it('handles February on leap and common years', () => {
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29');
    expect(addDays('2027-02-28', 1)).toBe('2027-03-01');
  });

  it('subtracts days with a negative amount', () => {
    expect(addDays('2027-01-01', -1)).toBe('2026-12-31');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('keeps every day of a year distinct across DST-prone months', () => {
    const seen = new Set<string>();
    for (let i = 0; i < 366; i++) seen.add(addDays('2026-01-01', i));
    expect(seen.size).toBe(366);
    expect(addDays('2026-01-01', 365)).toBe('2027-01-01');
  });
});

describe('daysBetween', () => {
  it('counts calendar days from the first to the second date', () => {
    expect(daysBetween('2026-12-30', '2027-01-02')).toBe(3);
    expect(daysBetween('2027-01-02', '2026-12-30')).toBe(-3);
    expect(daysBetween('2026-11-10', '2026-11-10')).toBe(0);
    expect(daysBetween('2028-02-01', '2028-03-01')).toBe(29);
  });
});
