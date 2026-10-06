var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoteServicio } from "../../lote-servicio/entities/lote-servicio.entity.js";
let Servicio = class Servicio {
    id;
    nombre;
    activo;
    lotes;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Servicio.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 120, unique: true }),
    __metadata("design:type", String)
], Servicio.prototype, "nombre", void 0);
__decorate([
    Column({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Servicio.prototype, "activo", void 0);
__decorate([
    OneToMany(() => LoteServicio, (loteServicio) => loteServicio.servicio),
    __metadata("design:type", Array)
], Servicio.prototype, "lotes", void 0);
Servicio = __decorate([
    Entity("servicios")
], Servicio);
export { Servicio };
//# sourceMappingURL=servicio.entity.js.map