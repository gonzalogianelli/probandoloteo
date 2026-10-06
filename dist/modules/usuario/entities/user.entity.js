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
import { Role } from "../../rol/entities/rol.entity.js";
let User = class User {
    id;
    roleId;
    role;
    clientId;
    nombre;
    apellido;
    dni;
    email;
    telefono;
    passwordHash;
    activo;
    createdAt;
    updatedAt;
    deletedAt;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column({ name: "role_id", type: "int" }),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    ManyToOne(() => Role, { eager: true, nullable: false, onDelete: "RESTRICT" }),
    JoinColumn({ name: "role_id" }),
    __metadata("design:type", Role)
], User.prototype, "role", void 0);
__decorate([
    Column({ name: "client_id", type: "int", nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "clientId", void 0);
__decorate([
    Column({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], User.prototype, "nombre", void 0);
__decorate([
    Column({ type: "varchar", length: 120 }),
    __metadata("design:type", String)
], User.prototype, "apellido", void 0);
__decorate([
    Column({ type: "varchar", length: 20, unique: true }),
    __metadata("design:type", String)
], User.prototype, "dni", void 0);
__decorate([
    Column({ type: "varchar", length: 180, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar", length: 50, nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "telefono", void 0);
__decorate([
    Column({
        name: "password_hash",
        type: "varchar",
        length: 255,
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    Column({ type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "activo", void 0);
__decorate([
    CreateDateColumn({ name: "created_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn({ name: "updated_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    DeleteDateColumn({ name: "deleted_at", type: "datetime", precision: 6 }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
User = __decorate([
    Entity("usuarios")
], User);
export { User };
//# sourceMappingURL=user.entity.js.map