var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, } from "typeorm";
import { Pago } from "../../pago/entities/pago.entity.js";
import { MedioPago } from "../../medio/entities/medio.entity.js";
let PagoMedio = class PagoMedio {
    id;
    pagoId;
    pago;
    medioPagoId;
    medioPago;
    importe;
    referencia;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PagoMedio.prototype, "id", void 0);
__decorate([
    Column({ name: "pago_id", type: "int" }),
    __metadata("design:type", Number)
], PagoMedio.prototype, "pagoId", void 0);
__decorate([
    ManyToOne(() => Pago, { onDelete: "CASCADE" }),
    JoinColumn({ name: "pago_id" }),
    __metadata("design:type", Pago)
], PagoMedio.prototype, "pago", void 0);
__decorate([
    Column({ name: "medio_pago_id", type: "int" }),
    __metadata("design:type", Number)
], PagoMedio.prototype, "medioPagoId", void 0);
__decorate([
    ManyToOne(() => MedioPago, { eager: true, onDelete: "RESTRICT" }),
    JoinColumn({ name: "medio_pago_id" }),
    __metadata("design:type", MedioPago)
], PagoMedio.prototype, "medioPago", void 0);
__decorate([
    Column({ type: "decimal", precision: 16, scale: 2 }),
    __metadata("design:type", Number)
], PagoMedio.prototype, "importe", void 0);
__decorate([
    Column({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], PagoMedio.prototype, "referencia", void 0);
PagoMedio = __decorate([
    Entity("pago_medios")
], PagoMedio);
export { PagoMedio };
//# sourceMappingURL=pago-medio.entity.js.map