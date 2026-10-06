import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";
export class CreatePagoMedioDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) pagoId!: number;
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) medioPagoId!: number;
  @ApiProperty({ example: 400000 }) @IsNumber() @Min(0.01) importe!: number;
  @ApiPropertyOptional() @IsOptional() @IsString() referencia?: string | null;
}
