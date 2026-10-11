import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateServicioDto {
  @ApiProperty({ example: "Red eléctrica" })
  @IsString()
  @IsNotEmpty()
  @Length(2, 120)
  nombre!: string;
}
