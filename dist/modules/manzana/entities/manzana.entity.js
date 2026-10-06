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
import { Loteo } from "../../loteo/entities/loteo.entity.js";
let Manzana = class Manzana {
    id;
    loteoId;
    loteo;
    nombre;
    circunscripcion;
    seccion;
    quinta;
    parcela;
    callePar1;
    callePar2;
    calleImpar1;
    calleImpar2;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Manzana.prototype, "id", void 0);
__decorate([
    Column({ name: "loteo_id", type: "int" }),
    __metadata("design:type", Number)
], Manzana.prototype, "loteoId", void 0);
__decorate([
    ManyToOne(() => Loteo, {
        eager: true,
        nullable: false,
        onDelete: "RESTRICT",
    }),
    JoinColumn({ name: "loteo_id" }),
    __metadata("design:type", Loteo)
], Manzana.prototype, "loteo", void 0);
__decorate([
    Column({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Manzana.prototype, "nombre", void 0);
__decorate([
    Column({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], Manzana.prototype, "circunscripcion", void 0);
__decorate([
    Column({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], Manzana.prototype, "seccion", void 0);
__decorate([
    Column({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], Manzana.prototype, "quinta", void 0);
__decorate([
    Column({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], Manzana.prototype, "parcela", void 0);
__decorate([
    Column({ name: "calle_par_1", type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", Object)
], Manzana.prototype, "callePar1", void 0);
__decorate([
    Column({ name: "calle_par_2", type: "varchar", length: 150, nullable: true }),
    __metadata("design:type", Object)
], Manzana.prototype, "callePar2", void 0);
__decorate([
    Column({
        name: "calle_impar_1",
        type: "varchar",
        length: 150,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Manzana.prototype, "calleImpar1", void 0);
__decorate([
    Column({
        name: "calle_impar_2",
        type: "varchar",
        length: 150,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Manzana.prototype, "calleImpar2", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Manzana.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Manzana.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], Manzana.prototype, "deletedAt", void 0);
Manzana = __decorate([
    Entity("manzanas"),
    Unique("uq_manzana_loteo_nombre", ["loteoId", "nombre"])
], Manzana);
export { Manzana };
//# sourceMappingURL=manzana.entity.js.map