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
import { Transform, Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min, } from "class-validator";
import { LoteEstado } from "../entities/lote.entity.js";
export class CreateLoteDto {
    manzanaId;
    codigo;
    largo;
    ancho;
    precio;
    estado;
    direccion;
    entreCalle1;
    entreCalle2;
    serviciosIds;
}
__decorate([
    ApiProperty({ example: 1 }),
    Type(() => Number),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateLoteDto.prototype, "manzanaId", void 0);
__decorate([
    ApiProperty({ example: "A-01" }),
    IsString(),
    IsNotEmpty(),
    Length(1, 50),
    __metadata("design:type", String)
], CreateLoteDto.prototype, "codigo", void 0);
__decorate([
    ApiProperty({ example: 30 }),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateLoteDto.prototype, "largo", void 0);
__decorate([
    ApiProperty({ example: 12 }),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateLoteDto.prototype, "ancho", void 0);
__decorate([
    ApiProperty({ example: 18000000 }),
    Type(() => Number),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateLoteDto.prototype, "precio", void 0);
__decorate([
    ApiPropertyOptional({ enum: LoteEstado, example: LoteEstado.LIBRE }),
    IsOptional(),
    Transform(({ value }) => typeof value === "string" ? value.toUpperCase() : value),
    IsEnum(LoteEstado),
    __metadata("design:type", String)
], CreateLoteDto.prototype, "estado", void 0);
__decorate([
    ApiPropertyOptional({ example: "Av. San Martín" }),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateLoteDto.prototype, "direccion", void 0);
__decorate([
    ApiPropertyOptional({ example: "Calle 10" }),
    IsOptional(),
    Transform(({ obj }) => obj.entreCalle1 ?? obj.entre_calle_1),
    IsString(),
    __metadata("design:type", Object)
], CreateLoteDto.prototype, "entreCalle1", void 0);
__decorate([
    ApiPropertyOptional({ example: "Calle 12" }),
    IsOptional(),
    Transform(({ obj }) => obj.entreCalle2 ?? obj.entre_calle_2),
    IsString(),
    __metadata("design:type", Object)
], CreateLoteDto.prototype, "entreCalle2", void 0);
__decorate([
    ApiPropertyOptional({ example: [1, 2], type: [Number] }),
    IsOptional(),
    IsArray(),
    Transform(({ value }) => {
        if (!value)
            return [];
        if (typeof value === "string") {
            value = value.split(",").map((v) => v.trim());
        }
        if (Array.isArray(value)) {
            return value.map((v) => Number(v)).filter((v) => !isNaN(v));
        }
        return [];
    }),
    IsInt({ each: true }),
    Min(1, { each: true }),
    __metadata("design:type", Array)
], CreateLoteDto.prototype, "serviciosIds", void 0);
//# sourceMappingURL=create-lote.dto.js.map