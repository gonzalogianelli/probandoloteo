import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from "class-validator";
export class CreateManzanaDto {
  @ApiProperty({ example: 1 }) @IsInt() @Min(1) loteoId!: number;
  @ApiProperty({ example: "Manzana A" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre!: string;
  @ApiPropertyOptional() @IsOptional() @IsString() circunscripcion?:
    | string
    | null;
  @ApiPropertyOptional() @IsOptional() @IsString() seccion?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() quinta?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() parcela?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() callePar1?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() callePar2?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() calleImpar1?: string | null;
  @ApiPropertyOptional() @IsOptional() @IsString() calleImpar2?: string | null;
}
