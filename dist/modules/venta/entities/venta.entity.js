var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";
import { Lote } from "../../lote/entities/lote.entity.js";
import { PlanPago } from "../../plan/entities/plan.entity.js";
import { User } from "../../usuario/entities/user.entity.js";
export var VentaEstado;
(function (VentaEstado) {
    VentaEstado["ACTIVA"] = "ACTIVA";
    VentaEstado["CANCELADA"] = "CANCELADA";
    VentaEstado["FINALIZADA"] = "FINALIZADA";
})(VentaEstado || (VentaEstado = {}));
let Venta = class Venta {
    id;
    compradorId;
    comprador;
    loteId;
    lote;
    vendedorId;
    vendedor;
    planPagoId;
    planPago;
    fechaVenta;
    fechaBoleto;
    precioLista;
    bonificacionPorcentaje;
    bonificacionImporte;
    precioFinal;
    anticipo;
    importeFinanciado;
    cantidadCuotas;
    formatoPago;
    garante1;
    estado;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Venta.prototype, "id", void 0);
__decorate([
    Column({ name: "comprador_id", type: "int" }),
    __metadata("design:type", Number)
], Venta.prototype, "compradorId", void 0);
__decorate([
    ManyToOne(() => User, { eager: true, nullable: false, onDelete: "RESTRICT" }),
    JoinColumn({ name: "comprador_id" }),
    __metadata("design:type", User)
], Venta.prototype, "comprador", void 0);
__decorate([
    Column({ name: "lote_id", type: "int" }),
    __metadata("design:type", Number)
], Venta.prototype, "loteId", void 0);
__decorate([
    ManyToOne(() => Lote, { eager: true, nullable: false, onDelete: "RESTRICT" }),
    JoinColumn({ name: "lote_id" }),
    __metadata("design:type", Lote)
], Venta.prototype, "lote", void 0);
__decorate([
    Column({ name: "vendedor_id", type: "int" }),
    __metadata("design:type", Number)
], Venta.prototype, "vendedorId", void 0);
__decorate([
    ManyToOne(() => User, { eager: true, nullable: false, onDelete: "RESTRICT" }),
    JoinColumn({ name: "vendedor_id" }),
    __metadata("design:type", User)
], Venta.prototype, "vendedor", void 0);
__decorate([
    Column({ name: "plan_pago_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], Venta.prototype, "planPagoId", void 0);
__decorate([
    ManyToOne(() => PlanPago, {
        eager: true,
        nullable: true,
        onDelete: "SET NULL",
    }),
    JoinColumn({ name: "plan_pago_id" }),
    __metadata("design:type", Object)
], Venta.prototype, "planPago", void 0);
__decorate([
    Column({ name: "fecha_venta", type: "date" }),
    __metadata("design:type", String)
], Venta.prototype, "fechaVenta", void 0);
__decorate([
    Column({ name: "fecha_boleto", type: "date", nullable: true }),
    __metadata("design:type", Object)
], Venta.prototype, "fechaBoleto", void 0);
__decorate([
    Column({ name: "precio_lista", type: "decimal", precision: 16, scale: 2 }),
    __metadata("design:type", Number)
], Venta.prototype, "precioLista", void 0);
__decorate([
    Column({
        name: "bonificacion_porcentaje",
        type: "decimal",
        precision: 8,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], Venta.prototype, "bonificacionPorcentaje", void 0);
__decorate([
    Column({
        name: "bonificacion_importe",
        type: "decimal",
        precision: 16,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], Venta.prototype, "bonificacionImporte", void 0);
__decorate([
    Column({ name: "precio_final", type: "decimal", precision: 16, scale: 2 }),
    __metadata("design:type", Number)
], Venta.prototype, "precioFinal", void 0);
__decorate([
    Column({
        name: "anticipo",
        type: "decimal",
        precision: 16,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], Venta.prototype, "anticipo", void 0);
__decorate([
    Column({
        name: "importe_financiado",
        type: "decimal",
        precision: 16,
        scale: 2,
        default: 0,
    }),
    __metadata("design:type", Number)
], Venta.prototype, "importeFinanciado", void 0);
__decorate([
    Column({ name: "cantidad_cuotas", type: "int", default: 0 }),
    __metadata("design:type", Number)
], Venta.prototype, "cantidadCuotas", void 0);
__decorate([
    Column({ name: "formato_pago", type: "text", nullable: true }),
    __metadata("design:type", Object)
], Venta.prototype, "formatoPago", void 0);
__decorate([
    Column({ name: "garante1", type: "json", nullable: true }),
    __metadata("design:type", Object)
], Venta.prototype, "garante1", void 0);
__decorate([
    Column({ type: "enum", enum: VentaEstado, default: VentaEstado.ACTIVA }),
    __metadata("design:type", String)
], Venta.prototype, "estado", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Venta.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Venta.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Venta.prototype, "deletedAt", void 0);
Venta = __decorate([
    Entity("ventas")
], Venta);
export { Venta };
//# sourceMappingURL=venta.entity.js.map