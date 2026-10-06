var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, } from "typeorm";
let Loteo = class Loteo {
    id;
    nombre;
    descripcion;
    ubicacion;
    activo;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Loteo.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], Loteo.prototype, "nombre", void 0);
__decorate([
    Column({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], Loteo.prototype, "descripcion", void 0);
__decorate([
    Column({ type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], Loteo.prototype, "ubicacion", void 0);
__decorate([
    Column({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], Loteo.prototype, "activo", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Loteo.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Loteo.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Loteo.prototype, "deletedAt", void 0);
Loteo = __decorate([
    Entity("loteos")
], Loteo);
export { Loteo };
//# sourceMappingURL=loteo.entity.js.map