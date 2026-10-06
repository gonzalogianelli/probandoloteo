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
import { LoteoService } from "./loteo.service.js";
import { CreateLoteoDto } from "./dto/create-loteo.dto.js";
import { UpdateLoteoDto } from "./dto/update-loteo.dto.js";

@ApiTags("Loteos")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles("ADMIN")
@Controller("loteos")
export class LoteoController {
  constructor(private readonly service: LoteoService) {}

  @Get()
  @ApiOperation({ summary: "Obtener todos los registros" })
  @ApiResponse({
    status: 200,
    description: "Registros obtenidos correctamente",
  })
  @ApiResponse({ status: 500, description: "Error interno del servidor" })
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query.skip, query.limit, query.orderby);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener un registro por ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Registro obtenido correctamente" })
  @ApiResponse({ status: 404, description: "Registro no encontrado" })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({ summary: "Crear un registro" })
  @ApiBody({ type: CreateLoteoDto })
  @ApiResponse({ status: 201, description: "Registro creado correctamente" })
  @ApiResponse({ status: 400, description: "Datos inválidos o duplicados" })
  create(@Body() dto: CreateLoteoDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar un registro" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateLoteoDto })
  @ApiResponse({
    status: 200,
    description: "Registro actualizado correctamente",
  })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @ApiResponse({ status: 404, description: "Registro no encontrado" })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateLoteoDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar un registro" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Registro eliminado correctamente" })
  @ApiResponse({ status: 404, description: "Registro no encontrado" })
  @ApiResponse({
    status: 500,
    description: "No se puede eliminar por dependencias",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
