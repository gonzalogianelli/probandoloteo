var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
export class PaginationDto {
    skip = 0;
    limit = 10;
    orderby;
}
__decorate([
    ApiPropertyOptional({ example: 0, minimum: 0, default: 0 }),
    IsOptional(),
    Type(() => Number),
    IsInt({ message: "skip debe ser un número entero" }),
    Min(0, { message: "skip no puede ser negativo" }),
    __metadata("design:type", Object)
], PaginationDto.prototype, "skip", void 0);
__decorate([
    ApiPropertyOptional({ example: 10, minimum: 1, maximum: 100, default: 10 }),
    IsOptional(),
    Type(() => Number),
    IsInt({ message: "limit debe ser un número entero" }),
    Min(1, { message: "limit debe ser mayor a 0" }),
    Max(100, { message: "limit no puede ser mayor a 100" }),
    __metadata("design:type", Object)
], PaginationDto.prototype, "limit", void 0);
__decorate([
    ApiPropertyOptional({
        example: "id:DESC",
        description: "Campo y dirección de ordenamiento: campo:ASC o campo:DESC",
    }),
    IsOptional(),
    IsString({ message: "orderby debe ser un texto" }),
    __metadata("design:type", String)
], PaginationDto.prototype, "orderby", void 0);
//# sourceMappingURL=pagination.dto.js.map