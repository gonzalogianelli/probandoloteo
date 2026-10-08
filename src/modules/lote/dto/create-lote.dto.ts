import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";
import { LoteEstado } from "../entities/lote.entity.js";

export class CreateLoteDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  manzanaId!: number;

  @ApiProperty({ example: "A-01" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  codigo!: string;

  @ApiProperty({ example: 30 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  largo!: number;

  @ApiProperty({ example: 12 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  ancho!: number;

  @ApiProperty({ example: 18000000 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  precio!: number;

  @ApiPropertyOptional({ enum: LoteEstado, example: LoteEstado.LIBRE })
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? (value.toUpperCase() as LoteEstado) : value,
  )
  @IsEnum(LoteEstado)
  estado?: LoteEstado;

  @ApiPropertyOptional({ example: "Calle 10" })
  @IsOptional()
  @Transform(({ obj }) => obj.calle1 ?? obj.calle_1)
  @IsString()
  calle1?: string | null;

  @ApiPropertyOptional({ example: "Calle 12" })
  @IsOptional()
  @Transform(({ obj }) => obj.calle2 ?? obj.calle_2)
  @IsString()
  calle2?: string | null;

  @ApiPropertyOptional({ example: "Calle 14" })
  @IsOptional()
  @Transform(({ obj }) => obj.calle3 ?? obj.calle_3)
  @IsString()
  calle3?: string | null;

  @ApiPropertyOptional({ example: [1, 2], type: [Number] })
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (!value) return [];
    if (typeof value === "string") {
      value = value.split(",").map((v) => v.trim());
    }
    if (Array.isArray(value)) {
      return value.map((v) => Number(v)).filter((v) => !isNaN(v));
    }
    return [];
  })
  @IsInt({ each: true })
  @Min(1, { each: true })
  serviciosIds?: number[];
}
