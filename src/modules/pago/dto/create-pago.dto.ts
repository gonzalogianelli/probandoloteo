import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from "class-validator";
import { Moneda } from "../entities/pago.entity.js";

class MedioPagoDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) medioPagoId!: number;
  @ApiProperty({ example: 400000 }) @IsNumber() @Min(0.01) importe!: number;
  @ApiPropertyOptional({ example: "TRX-123" })
  @IsOptional()
  @IsString()
  referencia?: string | null;
}
export class CreatePagoDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) ventaId!: number;
  @ApiProperty({ example: "2026-10-02" }) @IsDateString() fechaPago!: string;
  @ApiProperty({ example: 400000 })
  @IsNumber()
  @Min(0.01)
  importeTotal!: number;
  @ApiPropertyOptional({ enum: Moneda, example: Moneda.ARS })
  @IsOptional()
  @IsEnum(Moneda)
  moneda?: Moneda;
  @ApiPropertyOptional({ example: 1200.5 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cotizacionDolar?: number | null;
  @ApiPropertyOptional() @IsOptional() @IsString() observaciones?:
    | string
    | null;
  @ApiPropertyOptional() @IsOptional() @IsString() comprobanteUrl?:
    | string
    | null;
  @ApiPropertyOptional({ example: [1, 2] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  cuotaIds?: number[];
  @ApiPropertyOptional({ example: "Pago a cuenta de deuda" })
  @IsOptional()
  @IsString()
  tipoPago?: string;
  @ApiPropertyOptional({ type: [MedioPagoDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MedioPagoDto)
  mediosPago?: MedioPagoDto[];
}
