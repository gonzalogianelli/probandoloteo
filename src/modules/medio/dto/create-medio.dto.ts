import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
export class CreateMedioDto {
  @ApiProperty({ example: "Transferencia bancaria" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  nombre!: string;
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
