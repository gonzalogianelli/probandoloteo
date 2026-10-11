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
  @ApiProperty({ example: 1 }) 
  @IsInt() 
  @Min(1) 
  loteoId!: number;

  @ApiProperty({ example: "Manzana A" })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  nombre!: string;

  @ApiPropertyOptional({ example: "I" }) 
  @IsOptional() 
  @IsString() 
  circunscripcion?:
    | string
    | null;

  @ApiPropertyOptional({ example: "E" }) 
  @IsOptional() 
  @IsString() 
  seccion?: string | null;

  @ApiPropertyOptional({ example: "70" }) 
  @IsOptional() 
  @IsString() 
  quinta?: string | null;

  @ApiPropertyOptional({ example: "55" }) 
  @IsOptional() 
  @IsString() 
  parcela?: string | null;

  @ApiPropertyOptional({ example: "Calle 48" }) 
  @IsNotEmpty()
  @IsString() 
  callePar1: string | null;

  @ApiPropertyOptional({ example: "Calle 50" }) 
  @IsNotEmpty()
  @IsString() 
  callePar2: string | null;

  @ApiPropertyOptional({ example: "Calle 61" }) 
  @IsNotEmpty()
  @IsString() 
  calleImpar1: string | null;

  @ApiPropertyOptional({ example: "Calle 63" }) 
  @IsNotEmpty()
  @IsString() 
  calleImpar2: string | null;
}
