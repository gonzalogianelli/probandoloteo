var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn, } from "typeorm";
import { Venta } from "../../venta/entities/venta.entity.js";
export var CuotaEstado;
(function (CuotaEstado) {
    CuotaEstado["PENDIENTE"] = "PENDIENTE";
    CuotaEstado["PAGADA"] = "PAGADA";
    CuotaEstado["PARCIAL"] = "PARCIAL";
    CuotaEstado["VENCIDA"] = "VENCIDA";
})(CuotaEstado || (CuotaEstado = {}));
let Cuota = class Cuota {
    id;
    ventaId;
    venta;
    numero;
    fechaVencimiento;
    importe;
    saldo;
    estado;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Cuota.prototype, "id", void 0);
__decorate([
    Column({ name: "venta_id", type: "int" }),
    __metadata("design:type", Number)
], Cuota.prototype, "ventaId", void 0);
__decorate([
    ManyToOne(() => Venta, { onDelete: "CASCADE" }),
    JoinColumn({ name: "venta_id" }),
    __metadata("design:type", Venta)
], Cuota.prototype, "venta", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], Cuota.prototype, "numero", void 0);
__decorate([
    Column({ name: "fecha_vencimiento", type: "date" }),
    __metadata("design:type", String)
], Cuota.prototype, "fechaVencimiento", void 0);
__decorate([
    Column({ type: "decimal", precision: 16, scale: 2 }),
    __metadata("design:type", Number)
], Cuota.prototype, "importe", void 0);
__decorate([
    Column({ type: "decimal", precision: 16, scale: 2 }),
    __metadata("design:type", Number)
], Cuota.prototype, "saldo", void 0);
__decorate([
    Column({ type: "enum", enum: CuotaEstado, default: CuotaEstado.PENDIENTE }),
    __metadata("design:type", String)
], Cuota.prototype, "estado", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Cuota.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Cuota.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Cuota.prototype, "deletedAt", void 0);
Cuota = __decorate([
    Entity("cuotas"),
    Unique("uq_cuota_venta_numero", ["ventaId", "numero"])
], Cuota);
export { Cuota };
//# sourceMappingURL=cuota.entity.js.map