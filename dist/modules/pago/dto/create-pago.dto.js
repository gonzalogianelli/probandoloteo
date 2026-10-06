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
import { Type } from "class-transformer";
import { IsArray, IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsString, Min, ValidateNested, } from "class-validator";
import { Moneda } from "../entities/pago.entity.js";
class MedioPagoDto {
    medioPagoId;
    importe;
    referencia;
}
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], MedioPagoDto.prototype, "medioPagoId", void 0);
__decorate([
    ApiProperty({ example: 400000 }),
    IsNumber(),
    Min(0.01),
    __metadata("design:type", Number)
], MedioPagoDto.prototype, "importe", void 0);
__decorate([
    ApiPropertyOptional({ example: "TRX-123" }),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], MedioPagoDto.prototype, "referencia", void 0);
export class CreatePagoDto {
    ventaId;
    fechaPago;
    importeTotal;
    moneda;
    cotizacionDolar;
    observaciones;
    comprobanteUrl;
    cuotaIds;
    tipoPago;
    mediosPago;
}
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "ventaId", void 0);
__decorate([
    ApiProperty({ example: "2026-10-02" }),
    IsDateString(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "fechaPago", void 0);
__decorate([
    ApiProperty({ example: 400000 }),
    IsNumber(),
    Min(0.01),
    __metadata("design:type", Number)
], CreatePagoDto.prototype, "importeTotal", void 0);
__decorate([
    ApiPropertyOptional({ enum: Moneda, example: Moneda.ARS }),
    IsOptional(),
    IsEnum(Moneda),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "moneda", void 0);
__decorate([
    ApiPropertyOptional({ example: 1200.5 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Object)
], CreatePagoDto.prototype, "cotizacionDolar", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreatePagoDto.prototype, "observaciones", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreatePagoDto.prototype, "comprobanteUrl", void 0);
__decorate([
    ApiPropertyOptional({ example: [1, 2] }),
    IsOptional(),
    IsArray(),
    IsInt({ each: true }),
    Min(1, { each: true }),
    __metadata("design:type", Array)
], CreatePagoDto.prototype, "cuotaIds", void 0);
__decorate([
    ApiPropertyOptional({ example: "Pago a cuenta de deuda" }),
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], CreatePagoDto.prototype, "tipoPago", void 0);
__decorate([
    ApiPropertyOptional({ type: [MedioPagoDto] }),
    IsOptional(),
    IsArray(),
    ValidateNested({ each: true }),
    Type(() => MedioPagoDto),
    __metadata("design:type", Array)
], CreatePagoDto.prototype, "mediosPago", void 0);
//# sourceMappingURL=create-pago.dto.js.map