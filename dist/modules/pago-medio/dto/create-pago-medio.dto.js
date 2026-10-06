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
import { IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";
export class CreatePagoMedioDto {
    pagoId;
    medioPagoId;
    importe;
    referencia;
}
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreatePagoMedioDto.prototype, "pagoId", void 0);
__decorate([
    ApiProperty({ example: 1 }),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreatePagoMedioDto.prototype, "medioPagoId", void 0);
__decorate([
    ApiProperty({ example: 400000 }),
    IsNumber(),
    Min(0.01),
    __metadata("design:type", Number)
], CreatePagoMedioDto.prototype, "importe", void 0);
__decorate([
    ApiPropertyOptional(),
    IsOptional(),
    IsString(),
    __metadata("design:type", Object)
], CreatePagoMedioDto.prototype, "referencia", void 0);
//# sourceMappingURL=create-pago-medio.dto.js.map