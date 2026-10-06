import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsInt, IsNumber, Min } from "class-validator";
import { CuotaEstado } from "../entities/cuota.entity.js";
export class CreateCuotaDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) ventaId!: number;
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) numero!: number;
  @ApiProperty({ example: "2026-11-02" })
  @IsDateString()
  fechaVencimiento!: string;
  @ApiProperty({ example: 400000 }) @IsNumber() @Min(0) importe!: number;
  @ApiProperty({ example: 400000 }) @IsNumber() @Min(0) saldo!: number;
  @ApiProperty({ enum: CuotaEstado }) @IsEnum(CuotaEstado) estado!: CuotaEstado;
}
