import { BadRequestException } from "@nestjs/common";
import { ObjectLiteral, Repository } from "typeorm";

export function resolveOrder<T extends ObjectLiteral>(
  repository: Repository<T>,
  orderby?: string,
) {
  if (!orderby) return undefined;

  if (typeof orderby !== "string" || !orderby.includes(":")) {
    throw new BadRequestException(
      "El parámetro orderby debe tener formato campo:ASC o campo:DESC",
    );
  }

  const [field, rawDirection] = orderby.split(":");
  const direction = rawDirection?.toUpperCase();

  const valid = repository.metadata.columns.some(
    (column) => column.propertyName === field,
  );

  if (!valid) {
    throw new BadRequestException(`El campo ${field} no existe en la entidad`);
  }

  if (direction !== "ASC" && direction !== "DESC") {
    throw new BadRequestException(
      "La dirección de ordenamiento debe ser ASC o DESC",
    );
  }

  return {
    [field]: direction,
  } as Record<string, "ASC" | "DESC">;
}

export function ensureUpdateData(data: object): void {
  if (!Object.keys(data).length) {
    throw new BadRequestException(
      "Debe enviar al menos un campo para actualizar",
    );
  }
}
