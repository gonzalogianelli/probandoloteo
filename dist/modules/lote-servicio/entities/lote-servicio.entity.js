var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
let LoteServicio = class LoteServicio {
    loteId;
    lote;
    servicioId;
    servicio;
};
__decorate([
    PrimaryColumn({ name: "lote_id", type: "int" }),
    __metadata("design:type", Number)
], LoteServicio.prototype, "loteId", void 0);
__decorate([
    ManyToOne("Lote", "servicios", {
        onDelete: "CASCADE",
        nullable: false,
    }),
    JoinColumn({ name: "lote_id" }),
    __metadata("design:type", Function)
], LoteServicio.prototype, "lote", void 0);
__decorate([
    PrimaryColumn({ name: "servicio_id", type: "int" }),
    __metadata("design:type", Number)
], LoteServicio.prototype, "servicioId", void 0);
__decorate([
    ManyToOne("Servicio", "loteServicios", {
        onDelete: "RESTRICT",
        nullable: false,
    }),
    JoinColumn({ name: "servicio_id" }),
    __metadata("design:type", Function)
], LoteServicio.prototype, "servicio", void 0);
LoteServicio = __decorate([
    Entity("lote_servicios")
], LoteServicio);
export { LoteServicio };
//# sourceMappingURL=lote-servicio.entity.js.map