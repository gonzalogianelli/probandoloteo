import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsObject,
  IsString,
  Min,
} from "class-validator";
import { VentaEstado } from "../entities/venta.entity.js";
export class CreateVentaDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) compradorId!: number;
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) loteId!: number;
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  vendedorId?: number;
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  planPagoId?: number | null;
  @ApiProperty({ example: "2026-10-02" }) @IsDateString() fechaVenta!: string;
  @ApiPropertyOptional({ example: "2026-10-02" })
  @IsOptional()
  @IsDateString()
  fechaBoleto?: string | null;
  @ApiProperty({ example: 18000000 }) @IsNumber() @Min(0) precioLista!: number;
  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bonificacionPorcentaje?: number;
  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bonificacionImporte?: number;
  @ApiProperty({ example: 18000000 }) @IsNumber() @Min(0) precioFinal!: number;
  @ApiPropertyOptional({ example: 3600000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  anticipo?: number;
  @ApiPropertyOptional({ example: 14400000 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  importeFinanciado?: number;
  @ApiPropertyOptional({ example: 36 })
  @IsOptional()
  @IsInt()
  @Min(0)
  cantidadCuotas?: number;
  @ApiPropertyOptional({ example: "20% anticipo + 36 cuotas" })
  @IsOptional()
  @IsString()
  formatoPago?: string | null;
  @ApiPropertyOptional({ enum: VentaEstado })
  @IsOptional()
  @IsEnum(VentaEstado)
  estado?: VentaEstado;
  @ApiPropertyOptional({ example: "2026-11-02" })
  @IsOptional()
  @IsDateString()
  fechaPrimerVencimiento?: string;
  @ApiPropertyOptional({
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
  })
  @IsOptional()
  @IsObject()
  garante1?: Record<string, unknown> | null;
}
