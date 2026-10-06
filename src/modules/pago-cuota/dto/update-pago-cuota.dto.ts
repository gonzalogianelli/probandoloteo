import { PartialType } from "@nestjs/swagger";
import { CreatePagoCuotaDto } from "./create-pago-cuota.dto.js";
export class UpdatePagoCuotaDto extends PartialType(CreatePagoCuotaDto) {}
