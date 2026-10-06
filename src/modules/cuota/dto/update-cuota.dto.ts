import { PartialType } from "@nestjs/swagger";
import { CreateCuotaDto } from "./create-cuota.dto.js";
export class UpdateCuotaDto extends PartialType(CreateCuotaDto) {}
