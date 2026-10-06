var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
export var Moneda;
(function (Moneda) {
    Moneda["ARS"] = "ARS";
    Moneda["USD"] = "USD";
})(Moneda || (Moneda = {}));
let Pago = class Pago {
    id;
    ventaId;
    venta;
    usuarioId;
    usuario;
    fechaPago;
    importeTotal;
    moneda;
    cotizacionDolar;
    observaciones;
    comprobanteUrl;
    createdAt;
    mediosPago;
    pagosCuotas;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Pago.prototype, "id", void 0);
__decorate([
    Column({ name: "venta_id", type: "int" }),
    __metadata("design:type", Number)
], Pago.prototype, "ventaId", void 0);
__decorate([
    ManyToOne("Venta", {
        eager: true,
        nullable: false,
        onDelete: "RESTRICT",
    }),
    JoinColumn({ name: "venta_id" }),
    __metadata("design:type", Function)
], Pago.prototype, "venta", void 0);
__decorate([
    Column({ name: "usuario_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Pago.prototype, "usuarioId", void 0);
__decorate([
    ManyToOne("User", {
        eager: true,
        nullable: true,
        onDelete: "SET NULL",
    }),
    JoinColumn({ name: "usuario_id" }),
    __metadata("design:type", Object)
], Pago.prototype, "usuario", void 0);
__decorate([
    Column({ name: "fecha_pago", type: "date" }),
    __metadata("design:type", String)
], Pago.prototype, "fechaPago", void 0);
__decorate([
    Column({ name: "importe_total", type: "decimal", precision: 16, scale: 2 }),
    __metadata("design:type", Number)
], Pago.prototype, "importeTotal", void 0);
__decorate([
    Column({ type: "enum", enum: Moneda, default: Moneda.ARS }),
    __metadata("design:type", String)
], Pago.prototype, "moneda", void 0);
__decorate([
    Column({
        name: "cotizacion_dolar",
        type: "decimal",
        precision: 16,
        scale: 4,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Pago.prototype, "cotizacionDolar", void 0);
__decorate([
    Column({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], Pago.prototype, "observaciones", void 0);
__decorate([
    Column({
        name: "comprobante_url",
        type: "varchar",
        length: 500,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Pago.prototype, "comprobanteUrl", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Pago.prototype, "createdAt", void 0);
__decorate([
    OneToMany("PagoMedio", "pago", { cascade: true }),
    __metadata("design:type", Array)
], Pago.prototype, "mediosPago", void 0);
__decorate([
    OneToMany("PagoCuota", "pago", { cascade: true }),
    __metadata("design:type", Array)
], Pago.prototype, "pagosCuotas", void 0);
Pago = __decorate([
    Entity("pagos")
], Pago);
export { Pago };
//# sourceMappingURL=pago.entity.js.map