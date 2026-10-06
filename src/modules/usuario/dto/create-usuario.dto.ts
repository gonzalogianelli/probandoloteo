import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";
export class CreateUsuarioDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) roleId!: number;
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  clientId?: number | null;
  @ApiProperty({ example: "Juan" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  nombre!: string;
  @ApiProperty({ example: "Pérez" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  apellido!: string;
  @ApiProperty({ example: "30123456" })
  @IsString()
  @IsNotEmpty()
  @Length(5, 20)
  dni!: string;
  @ApiProperty({ example: "juan@example.com" }) @IsEmail() email!: string;
  @ApiPropertyOptional({ example: "2264123456" })
  @IsOptional()
  @IsString()
  telefono?: string | null;
  @ApiProperty({ example: "admin123", writeOnly: true })
  @IsString()
  @IsNotEmpty()
  @Length(6, 100)
  password!: string;
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
