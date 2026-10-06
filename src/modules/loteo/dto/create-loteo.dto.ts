import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
export class CreateLoteoDto {
  @ApiProperty({ example: "Balcarce Norte" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  nombre!: string;
  @ApiPropertyOptional({ example: "Loteo residencial" })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  descripcion?: string | null;
  @ApiPropertyOptional({ example: "Balcarce, Buenos Aires" })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  ubicacion?: string | null;
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
