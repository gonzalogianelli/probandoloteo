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
import { IsDateString, IsEnum, IsInt, IsNumber, IsOptional, IsObject, IsString, Min, } from "class-validator";
import { VentaEstado } from "../entities/venta.entity.js";
export class CreateVentaDto {
    compradorId;
    loteId;
    vendedorId;
    planPagoId;
    fechaVenta;
    fechaBoleto;
    precioLista;
    bonificacionPorcentaje;
    bonificacionImporte;
    precioFinal;
    anticipo;
    importeFinanciado;
    cantidadCuotas;
    formatoPago;
    estado;
    fechaPrimerVencimiento;
    garante1;
}
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "compradorId", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "loteId", void 0);
__decorate([
    ApiPropertyOptional({ example: 1 }),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "vendedorId", void 0);
__decorate([
    ApiPropertyOptional({ example: 1 }),
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Object)
], CreateVentaDto.prototype, "planPagoId", void 0);
__decorate([
    ApiProperty({ example: "2026-10-02" }),
    IsDateString(),
    __metadata("design:type", String)
], CreateVentaDto.prototype, "fechaVenta", void 0);
__decorate([
    ApiPropertyOptional({ example: "2026-10-02" }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", Object)
], CreateVentaDto.prototype, "fechaBoleto", void 0);
__decorate([
    ApiProperty({ example: 18000000 }),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "precioLista", void 0);
__decorate([
    ApiPropertyOptional({ example: 0 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "bonificacionPorcentaje", void 0);
__decorate([
    ApiPropertyOptional({ example: 0 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "bonificacionImporte", void 0);
__decorate([
    ApiProperty({ example: 18000000 }),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "precioFinal", void 0);
__decorate([
    ApiPropertyOptional({ example: 3600000 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "anticipo", void 0);
__decorate([
    ApiPropertyOptional({ example: 14400000 }),
    IsOptional(),
    IsNumber(),
    Min(0),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "importeFinanciado", void 0);
__decorate([
    ApiPropertyOptional({ example: 36 }),
    IsOptional(),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateVentaDto.prototype, "cantidadCuotas", void 0);
__decorate([
    ApiPropertyOptional({ example: "20% anticipo + 36 cuotas" }),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreateVentaDto.prototype, "formatoPago", void 0);
__decorate([
    ApiPropertyOptional({ enum: VentaEstado }),
    IsOptional(),
    IsEnum(VentaEstado),
    __metadata("design:type", String)
], CreateVentaDto.prototype, "estado", void 0);
__decorate([
    ApiPropertyOptional({ example: "2026-11-02" }),
    IsOptional(),
    IsDateString(),
    __metadata("design:type", String)
], CreateVentaDto.prototype, "fechaPrimerVencimiento", void 0);
__decorate([
    ApiPropertyOptional({
        type: "object",
        additionalProperties: true,
        example: {
            nombre: "Ana",
            apellido: "Gómez",
            dni: "30123456",
            telefono: "2264000000",
            email: "ana@example.com",
            domicilio: "Calle 1",
        },
    }),
    IsOptional(),
    IsObject(),
    __metadata("design:type", Object)
], CreateVentaDto.prototype, "garante1", void 0);
//# sourceMappingURL=create-venta.dto.js.map