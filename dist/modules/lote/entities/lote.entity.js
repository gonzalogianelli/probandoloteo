var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn, } from "typeorm";
export var LoteEstado;
(function (LoteEstado) {
    LoteEstado["LIBRE"] = "LIBRE";
    LoteEstado["RESERVADO"] = "RESERVADO";
    LoteEstado["VENDIDO"] = "VENDIDO";
})(LoteEstado || (LoteEstado = {}));
let Lote = class Lote {
    id;
    manzanaId;
    manzana;
    codigo;
    largo;
    ancho;
    superficie;
    precio;
    estado;
    direccion;
    entreCalle1;
    entreCalle2;
    servicios;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Lote.prototype, "id", void 0);
__decorate([
    Column({ name: "manzana_id", type: "int" }),
    __metadata("design:type", Number)
], Lote.prototype, "manzanaId", void 0);
__decorate([
    ManyToOne("Manzana", "lotes", {
        eager: true,
        nullable: false,
        onDelete: "RESTRICT",
    }),
    JoinColumn({ name: "manzana_id" }),
    __metadata("design:type", Function)
], Lote.prototype, "manzana", void 0);
__decorate([
    Column({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], Lote.prototype, "codigo", void 0);
__decorate([
    Column({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Lote.prototype, "largo", void 0);
__decorate([
    Column({ type: "decimal", precision: 12, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Lote.prototype, "ancho", void 0);
__decorate([
    Column({ type: "decimal", precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Lote.prototype, "superficie", void 0);
__decorate([
    Column({ type: "decimal", precision: 16, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], Lote.prototype, "precio", void 0);
__decorate([
    Column({ type: "enum", enum: LoteEstado, default: LoteEstado.LIBRE }),
    __metadata("design:type", String)
], Lote.prototype, "estado", void 0);
__decorate([
    Column({ type: "varchar", length: 180, nullable: true }),
    __metadata("design:type", Object)
], Lote.prototype, "direccion", void 0);
__decorate([
    Column({
        name: "entre_calle_1",
        type: "varchar",
        length: 180,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Lote.prototype, "entreCalle1", void 0);
__decorate([
    Column({
        name: "entre_calle_2",
        type: "varchar",
        length: 180,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Lote.prototype, "entreCalle2", void 0);
__decorate([
    OneToMany("LoteServicio", "lote"),
    __metadata("design:type", Array)
], Lote.prototype, "servicios", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Lote.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Lote.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Lote.prototype, "deletedAt", void 0);
Lote = __decorate([
    Entity("lotes"),
    Unique("uq_lote_manzana_codigo", ["manzanaId", "codigo"])
], Lote);
export { Lote };
//# sourceMappingURL=lote.entity.js.map