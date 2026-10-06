import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
export class CreateRolDto {
  @ApiProperty({ example: "ADMIN" })
  @IsString({ message: "El nombre del rol debe ser un texto" })
  @IsNotEmpty({ message: "El nombre del rol es obligatorio" })
  @Length(2, 50, {
    message: "El nombre del rol debe tener entre 2 y 50 caracteres",
  })
  nombre!: string;
  @ApiPropertyOptional({ example: "Acceso completo al sistema" })
  @IsOptional()
  @IsString({ message: "La descripción debe ser un texto" })
  descripcion?: string | null;
}
