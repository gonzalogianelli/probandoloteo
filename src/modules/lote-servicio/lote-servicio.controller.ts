import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { CreateLoteServicioDto } from "./dto/create-lote-servicio.dto.js";
import { UpdateLoteServicioDto } from "./dto/update-lote-servicio.dto.js";
import { LoteServicioService } from "./lote-servicio.service.js";

@ApiTags("Lote - Servicios")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles("ADMIN")
@Controller("lote-servicios")
export class LoteServicioController {
  constructor(private readonly service: LoteServicioService) {}

  @Get()
  @ApiOperation({ summary: "Obtener relaciones entre lotes y servicios" })
  @ApiResponse({
    status: 200,
    description: "Relaciones obtenidas correctamente",
  })
  @ApiResponse({ status: 500, description: "Error interno del servidor" })
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query.skip, query.limit, query.orderby);
  }

  @Get(":loteId/:servicioId")
  @ApiOperation({ summary: "Obtener una relación lote-servicio" })
  @ApiParam({ name: "loteId", type: Number })
  @ApiParam({ name: "servicioId", type: Number })
  @ApiResponse({ status: 200, description: "Relación obtenida correctamente" })
  @ApiResponse({ status: 404, description: "Relación no encontrada" })
  getById(
    @Param("loteId", ParseIntPipe) loteId: number,
    @Param("servicioId", ParseIntPipe) servicioId: number,
  ) {
    return this.service.getById(loteId, servicioId);
  }

  @Post()
  @ApiOperation({ summary: "Asociar un servicio a un lote" })
  @ApiBody({ type: CreateLoteServicioDto })
  @ApiResponse({ status: 201, description: "Relación creada correctamente" })
  @ApiResponse({
    status: 400,
    description: "Lote/servicio inexistente o relación duplicada",
  })
  create(@Body() dto: CreateLoteServicioDto) {
    return this.service.create(dto);
  }

  @Patch(":loteId/:servicioId")
  @ApiOperation({ summary: "Actualizar una relación lote-servicio" })
  @ApiParam({ name: "loteId", type: Number })
  @ApiParam({ name: "servicioId", type: Number })
  @ApiBody({ type: UpdateLoteServicioDto })
  @ApiResponse({
    status: 200,
    description: "Relación actualizada correctamente",
  })
  @ApiResponse({
    status: 400,
    description: "Datos inválidos o relación duplicada",
  })
  @ApiResponse({ status: 404, description: "Relación no encontrada" })
  update(
    @Param("loteId", ParseIntPipe) loteId: number,
    @Param("servicioId", ParseIntPipe) servicioId: number,
    @Body() dto: UpdateLoteServicioDto,
  ) {
    return this.service.update(loteId, servicioId, dto);
  }

  @Delete(":loteId/:servicioId")
  @ApiOperation({ summary: "Eliminar una relación lote-servicio" })
  @ApiParam({ name: "loteId", type: Number })
  @ApiParam({ name: "servicioId", type: Number })
  @ApiResponse({ status: 200, description: "Relación eliminada correctamente" })
  @ApiResponse({ status: 404, description: "Relación no encontrada" })
  @ApiResponse({ status: 500, description: "Error interno al eliminar" })
  remove(
    @Param("loteId", ParseIntPipe) loteId: number,
    @Param("servicioId", ParseIntPipe) servicioId: number,
  ) {
    return this.service.remove(loteId, servicioId);
  }
}
