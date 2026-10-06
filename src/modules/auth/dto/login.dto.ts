import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, Length } from "class-validator";
export class LoginDto {
  @ApiProperty({ example: "10000001" }) @IsString() @IsNotEmpty() dni!: string;
  @ApiProperty({ example: "admin123", writeOnly: true })
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  password!: string;

}
