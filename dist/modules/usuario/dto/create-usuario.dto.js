var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Min, } from "class-validator";
export class CreateUsuarioDto {
    roleId;
    nombre;
    apellido;
    dni;
    email;
    telefono;
    password;
}
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateUsuarioDto.prototype, "roleId", void 0);
__decorate([
    ApiProperty({ example: "Juan" }),
    IsString(),
    IsNotEmpty(),
    Length(2, 120),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "nombre", void 0);
__decorate([
    ApiProperty({ example: "Pérez" }),
    IsString(),
    IsNotEmpty(),
    Length(2, 120),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "apellido", void 0);
__decorate([
    ApiProperty({ example: "30123456" }),
    IsString(),
    IsNotEmpty(),
    Length(5, 20),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "dni", void 0);
__decorate([
    ApiProperty({ example: "juan@example.com" }),
    IsEmail(),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "email", void 0);
__decorate([
    ApiPropertyOptional({ example: "2264123456" }),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateUsuarioDto.prototype, "telefono", void 0);
__decorate([
    ApiProperty({ example: "admin123", writeOnly: true }),
    IsString(),
    IsNotEmpty(),
    Length(6, 100),
    __metadata("design:type", String)
], CreateUsuarioDto.prototype, "password", void 0);
//# sourceMappingURL=create-usuario.dto.js.map