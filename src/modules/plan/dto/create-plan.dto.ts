import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";
export class CreatePlanDto {
  @ApiProperty({ example: "48 cuotas" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 150)
  nombre!: string;
  @ApiProperty({ example: 48 }) @IsInt() @Min(0) cantidadCuotas!: number;
  @ApiProperty({ example: 0 }) @IsNumber() @Min(0) @Max(1000) interes!: number;
  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  personalizado?: boolean;
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  activo?: boolean;
}
