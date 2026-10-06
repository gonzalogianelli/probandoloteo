var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
let PlanPago = class PlanPago {
    id;
    nombre;
    cantidadCuotas;
    interes;
    personalizado;
    activo;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PlanPago.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], PlanPago.prototype, "nombre", void 0);
__decorate([
    Column({ name: "cantidad_cuotas", type: "int", default: 0 }),
    __metadata("design:type", Number)
], PlanPago.prototype, "cantidadCuotas", void 0);
__decorate([
    Column({ type: "decimal", precision: 8, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], PlanPago.prototype, "interes", void 0);
__decorate([
    Column({ default: false }),
    __metadata("design:type", Boolean)
], PlanPago.prototype, "personalizado", void 0);
__decorate([
    Column({ default: true }),
    __metadata("design:type", Boolean)
], PlanPago.prototype, "activo", void 0);
PlanPago = __decorate([
    Entity("planes_pago")
], PlanPago);
export { PlanPago };
//# sourceMappingURL=plan.entity.js.map