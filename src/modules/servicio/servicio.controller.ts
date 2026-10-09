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
import { ServicioService } from "./servicio.service.js";
import { CreateServicioDto } from "./dto/create-servicio.dto.js";
import { UpdateServicioDto } from "./dto/update-servicio.dto.js";

@ApiTags("Servicios")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles("ADMIN")
@Controller("servicios")
export class ServicioController {
  constructor(private readonly service: ServicioService) {}

  @Get()
  @ApiOperation({ summary: "Obtener todos los servicios" })
  @ApiResponse({
    status: 200,
    description: "Servicios obtenidos correctamente",
  })
  @ApiResponse({ status: 500, description: "Error interno del servidor" })
  findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query.skip, query.limit, query.orderby);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener un servicio por ID" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Servicio obtenido correctamente" })
  @ApiResponse({ status: 404, description: "Servicio no encontrado" })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({ summary: "Crear un servicio" })
  @ApiBody({ type: CreateServicioDto })
  @ApiResponse({ status: 201, description: "Servicio creado correctamente" })
  @ApiResponse({
    status: 400,
    description: "Datos inválidos o servicio duplicado",
  })
  create(@Body() dto: CreateServicioDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar un servicio" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdateServicioDto })
  @ApiResponse({
    status: 200,
    description: "Servicio actualizado correctamente",
  })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @ApiResponse({ status: 404, description: "Servicio no encontrado" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateServicioDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Eliminar un servicio" })
  @ApiParam({ name: "id", type: Number })
  @ApiResponse({ status: 200, description: "Servicio eliminado correctamente" })
  @ApiResponse({ status: 404, description: "Servicio no encontrado" })
  @ApiResponse({
    status: 500,
    description: "No se puede eliminar por registros asociados",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
