import { PartialType } from "@nestjs/swagger";
import { CreateLoteServicioDto } from "./create-lote-servicio.dto.js";

export class UpdateLoteServicioDto extends PartialType(CreateLoteServicioDto) {}
