export function money(value) {
    const n = Number(value);
    if (!Number.isFinite(n))
        return 0;
    return Number(n.toFixed(2));
}
export function today() {
    return new Date().toISOString().slice(0, 10);
}
export function addMonths(dateValue, months) {
    const d = new Date(`${dateValue}T00:00:00`);
    d.setMonth(d.getMonth() + months);
    return d.toISOString().slice(0, 10);
}
export function cleanDni(value) {
    return String(value ?? "").trim();
}
//# sourceMappingURL=helpers.js.map