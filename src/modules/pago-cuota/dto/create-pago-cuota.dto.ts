import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNumber, Min } from "class-validator";
export class CreatePagoCuotaDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) pagoId!: number;
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) cuotaId!: number;
  @ApiProperty({ example: 400000 })
  @IsNumber()
  @Min(0.01)
  importeAplicado!: number;
}
