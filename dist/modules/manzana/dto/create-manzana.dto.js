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
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Min, } from "class-validator";
export class CreateManzanaDto {
    loteoId;
    nombre;
    circunscripcion;
    seccion;
    quinta;
    parcela;
    callePar1;
    callePar2;
    calleImpar1;
    calleImpar2;
}
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateManzanaDto.prototype, "loteoId", void 0);
__decorate([
    ApiProperty({ example: "Manzana A" }),
    IsString(),
    IsNotEmpty(),
    Length(1, 100),
    __metadata("design:type", String)
], CreateManzanaDto.prototype, "nombre", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateManzanaDto.prototype, "circunscripcion", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateManzanaDto.prototype, "seccion", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateManzanaDto.prototype, "quinta", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateManzanaDto.prototype, "parcela", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateManzanaDto.prototype, "callePar1", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateManzanaDto.prototype, "callePar2", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateManzanaDto.prototype, "calleImpar1", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateManzanaDto.prototype, "calleImpar2", void 0);
//# sourceMappingURL=create-manzana.dto.js.map