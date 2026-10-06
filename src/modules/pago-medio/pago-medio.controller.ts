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
import { PagoMedioService } from "./pago-medio.service.js";
import { CreatePagoMedioDto } from "./dto/create-pago-medio.dto.js";
import { UpdatePagoMedioDto } from "./dto/update-pago-medio.dto.js";

@ApiTags("Pagos - Medios")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles("ADMIN")
@Controller("pago-medios")
export class PagoMedioController {
  constructor(private readonly service: PagoMedioService) {}

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
  @ApiBody({ type: CreatePagoMedioDto })
  @ApiResponse({ status: 201, description: "Registro creado correctamente" })
  @ApiResponse({ status: 400, description: "Datos inválidos o duplicados" })
  create(@Body() dto: CreatePagoMedioDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Actualizar un registro" })
  @ApiParam({ name: "id", type: Number })
  @ApiBody({ type: UpdatePagoMedioDto })
  @ApiResponse({
    status: 200,
    description: "Registro actualizado correctamente",
  })
  @ApiResponse({ status: 400, description: "Datos inválidos" })
  @ApiResponse({ status: 404, description: "Registro no encontrado" })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePagoMedioDto,
  ) {
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
