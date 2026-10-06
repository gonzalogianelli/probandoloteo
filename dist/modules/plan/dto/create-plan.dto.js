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
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min, } from "class-validator";
export class CreatePlanDto {
    nombre;
    cantidadCuotas;
    interes;
    personalizado;
    activo;
}
__decorate([
    ApiProperty({ example: "48 cuotas" }),
    IsString(),
    IsNotEmpty(),
    Length(2, 150),
    __metadata("design:type", String)
], CreatePlanDto.prototype, "nombre", void 0);
__decorate([
    ApiProperty({ example: 48 }),
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "cantidadCuotas", void 0);
__decorate([
    ApiProperty({ example: 0 }),
    IsNumber(),
    Min(0),
    Max(1000),
    __metadata("design:type", Number)
], CreatePlanDto.prototype, "interes", void 0);
__decorate([
    ApiPropertyOptional({ example: false }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePlanDto.prototype, "personalizado", void 0);
__decorate([
    ApiPropertyOptional({ example: true }),
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreatePlanDto.prototype, "activo", void 0);
//# sourceMappingURL=create-plan.dto.js.map