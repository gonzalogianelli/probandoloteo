export function money(value: unknown): number {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Number(n.toFixed(2));
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function addMonths(dateValue: string, months: number): string {
  const d = new Date(`${dateValue}T00:00:00`);
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}

export function cleanDni(value: unknown): string {
  return String(value ?? "").trim();
}
