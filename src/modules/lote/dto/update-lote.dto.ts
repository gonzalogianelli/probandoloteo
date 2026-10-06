import { PartialType } from "@nestjs/swagger";
import { CreateLoteDto } from "./create-lote.dto.js";
export class UpdateLoteDto extends PartialType(CreateLoteDto) {}
