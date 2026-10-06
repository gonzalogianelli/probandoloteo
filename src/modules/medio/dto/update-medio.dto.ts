import { PartialType } from "@nestjs/swagger";
import { CreateMedioDto } from "./create-medio.dto.js";
export class UpdateMedioDto extends PartialType(CreateMedioDto) {}
