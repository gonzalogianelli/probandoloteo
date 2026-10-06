import { ApiProperty } from "@nestjs/swagger";
import { IsInt, Min } from "class-validator";

export class CreateLoteServicioDto {
  @ApiProperty({ example: 1, description: "ID del lote" })
  @IsInt({ message: "El loteId debe ser un número entero" })
  @Min(1, { message: "El loteId debe ser mayor a 0" })
  loteId!: number;

  @ApiProperty({ example: 1, description: "ID del servicio" })
  @IsInt({ message: "El servicioId debe ser un número entero" })
  @Min(1, { message: "El servicioId debe ser mayor a 0" })
  servicioId!: number;
}
