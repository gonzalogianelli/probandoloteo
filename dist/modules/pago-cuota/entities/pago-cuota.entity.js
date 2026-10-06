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
import { Pago } from "../../pago/entities/pago.entity.js";
import { Cuota } from "../../cuota/entities/cuota.entity.js";
let PagoCuota = class PagoCuota {
    id;
    pagoId;
    pago;
    cuotaId;
    cuota;
    importeAplicado;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PagoCuota.prototype, "id", void 0);
__decorate([
    Column({ name: "pago_id", type: "int" }),
    __metadata("design:type", Number)
], PagoCuota.prototype, "pagoId", void 0);
__decorate([
    ManyToOne(() => Pago, { onDelete: "CASCADE" }),
    JoinColumn({ name: "pago_id" }),
    __metadata("design:type", Pago)
], PagoCuota.prototype, "pago", void 0);
__decorate([
    Column({ name: "cuota_id", type: "int" }),
    __metadata("design:type", Number)
], PagoCuota.prototype, "cuotaId", void 0);
__decorate([
    ManyToOne(() => Cuota, { eager: true, onDelete: "RESTRICT" }),
    JoinColumn({ name: "cuota_id" }),
    __metadata("design:type", Cuota)
], PagoCuota.prototype, "cuota", void 0);
__decorate([
    Column({
        name: "importe_aplicado",
        type: "decimal",
        precision: 16,
        scale: 2,
    }),
    __metadata("design:type", Number)
], PagoCuota.prototype, "importeAplicado", void 0);
__decorate([
    CreateDateColumn({ name: "fecha_creacion", type: "timestamp" }),
    __metadata("design:type", Date)
], PagoCuota.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "fecha_actualizacion", type: "timestamp" }),
    __metadata("design:type", Date)
], PagoCuota.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ name: "fecha_eliminacion", type: "timestamp" }),
    __metadata("design:type", Date)
], PagoCuota.prototype, "deletedAt", void 0);
PagoCuota = __decorate([
    Entity("pago_cuotas"),
    Unique("uq_pago_cuota", ["pagoId", "cuotaId"])
], PagoCuota);
export { PagoCuota };
//# sourceMappingURL=pago-cuota.entity.js.map