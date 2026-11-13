import type { Branch, TimeInterval } from './types.ts';

export const days = [
  { index: 1, name: 'Lunes' },
  { index: 2, name: 'Martes' },
  { index: 3, name: 'Miércoles' },
  { index: 4, name: 'Jueves' },
  { index: 5, name: 'Viernes' },
  { index: 6, name: 'Sábado' },
  { index: 0, name: 'Domingo' },
];
export function minutes(time: string): number {
  if (!/^(?:[01]\d|2[0-3]):[0-5]\d$/.test(time))
    throw new Error(`Hora inválida: ${time}`);
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}
export function formatIntervals(intervals: TimeInterval[]): string {
  return intervals.length
    ? intervals.map((i) => `${i.start}–${i.end}`).join(' / ')
    : 'Cerrado';
}
function shiftDate(date: string, amount: number): string {
  const value = new Date(`${date}T12:00:00Z`);
  value.setUTCDate(value.getUTCDate() + amount);
  return value.toISOString().slice(0, 10);
}
export function intervalsForDate(branch: Branch, date: string): TimeInterval[] {
  return (
    branch.exceptions[date] ??
    branch.weekly[new Date(`${date}T12:00:00Z`).getUTCDay()] ??
    []
  );
}
export function businessStatus(branch: Branch, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: branch.timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const get = (key: string) => parts.find((p) => p.type === key)?.value ?? '';
  const date = `${get('year')}-${get('month')}-${get('day')}`;
  const minute = Number(get('hour')) * 60 + Number(get('minute'));
  const today = intervalsForDate(branch, date);
  const active = today.find((i) => {
    const start = minutes(i.start),
      end = minutes(i.end);
    return start < end ? minute >= start && minute < end : minute >= start;
  });
  // Una excepción de hoy sustituye todo el día, incluso un turno de ayer que cruzara medianoche.
  const previous = Object.hasOwn(branch.exceptions, date)
    ? undefined
    : intervalsForDate(branch, shiftDate(date, -1)).find(
        (i) => minutes(i.start) > minutes(i.end) && minute < minutes(i.end),
      );
  const interval = active ?? previous;
  return {
    open: Boolean(interval),
    date,
    day: new Date(`${date}T12:00:00Z`).getUTCDay(),
    closes: interval?.end,
    today,
  };
}
