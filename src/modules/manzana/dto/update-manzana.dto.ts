import { PartialType } from "@nestjs/swagger";
import { CreateManzanaDto } from "./create-manzana.dto.js";
export class UpdateManzanaDto extends PartialType(CreateManzanaDto) {}
