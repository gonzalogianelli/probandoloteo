import { PartialType } from "@nestjs/swagger";
import { CreateLoteoDto } from "./create-loteo.dto.js";
export class UpdateLoteoDto extends PartialType(CreateLoteoDto) {}
