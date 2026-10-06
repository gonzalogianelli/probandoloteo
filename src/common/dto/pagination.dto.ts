import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
  @ApiPropertyOptional({ example: 0, minimum: 0, default: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "skip debe ser un número entero" })
  @Min(0, { message: "skip no puede ser negativo" })
  skip = 0;

  @ApiPropertyOptional({ example: 10, minimum: 1, maximum: 100, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: "limit debe ser un número entero" })
  @Min(1, { message: "limit debe ser mayor a 0" })
  @Max(100, { message: "limit no puede ser mayor a 100" })
  limit = 10;

  @ApiPropertyOptional({
    example: "id:DESC",
    description: "Campo y dirección de ordenamiento: campo:ASC o campo:DESC",
  })
  @IsOptional()
  @IsString({ message: "orderby debe ser un texto" })
  orderby?: string;
}
