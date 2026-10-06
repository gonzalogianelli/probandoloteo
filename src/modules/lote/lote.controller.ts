import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { LoteService } from "./lote.service.js";
import { CreateLoteDto } from "./dto/create-lote.dto.js";
import { UpdateLoteDto } from "./dto/update-lote.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { LoteEstado } from "./entities/lote.entity.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";

@ApiTags("Lotes")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("lotes")
export class LoteController {
  constructor(private readonly service: LoteService) {}

  @Get()
  @Roles("ADMIN", "VENTAS")
  @ApiOperation({ summary: "Listar lotes con filtros" })
  @ApiQuery({ name: "manzanaId", required: false, type: Number })
  @ApiQuery({ name: "loteoId", required: false, type: Number })
  @ApiQuery({ name: "estado", required: false, enum: LoteEstado })
  @ApiResponse({ status: 200 })
  findAll(
    @Query()
    q: PaginationDto & {
      manzanaId?: number;
      loteoId?: number;
      estado?: LoteEstado;
    },
  ) {
    return this.service.findAll(q);
  }

  @Get(":id")
  @Roles("ADMIN", "VENTAS")
  @ApiOperation({ summary: "Obtener lote por ID" })
  @ApiParam({ name: "id", type: Number })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED) // 👈 Forzar el status code 201 en la respuesta HTTP
  @Roles("ADMIN")
  @ApiOperation({ summary: "Crear lote" })
  @ApiBody({ type: CreateLoteDto })
  @ApiResponse({ status: 201, description: "Lote creado correctamente" })
  create(@Body() dto: CreateLoteDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Actualizar lote" })
  @ApiBody({ type: UpdateLoteDto })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateLoteDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id") 
  @Roles("ADMIN")
  @ApiOperation({ summary: "Eliminar lote" }) 
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}

/*
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
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiPropertyOptional,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { LoteService } from "./lote.service.js";
import { CreateLoteDto } from "./dto/create-lote.dto.js";
import { UpdateLoteDto } from "./dto/update-lote.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { LoteEstado } from "./entities/lote.entity.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
import { UseGuards } from "@nestjs/common";
@ApiTags("Lotes")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("lotes")
export class LoteController {
  constructor(private readonly service: LoteService) {}
  @Get()
  @Roles("ADMIN", "VENTAS")
  @ApiOperation({ summary: "Listar lotes con filtros" })
  @ApiQuery({ name: "manzanaId", required: false, type: Number })
  @ApiQuery({ name: "loteoId", required: false, type: Number })
  @ApiQuery({ name: "estado", required: false, enum: LoteEstado })
  @ApiResponse({ status: 200 })
  findAll(
    @Query()
    q: PaginationDto & {
      manzanaId?: number;
      loteoId?: number;
      estado?: LoteEstado;
    },
  ) {
    return this.service.findAll(q);
  }
  @Get(":id")
  @Roles("ADMIN", "VENTAS")
  @ApiOperation({ summary: "Obtener lote por ID" })
  @ApiParam({ name: "id", type: Number })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.service.getById(id);
  }
  @Post()
  @Roles("ADMIN")
  @ApiOperation({ summary: "Crear lote" })
  @ApiBody({ type: CreateLoteDto })
  create(@Body() dto: CreateLoteDto) {
    return this.service.create(dto);
  }
  @Patch(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Actualizar lote" })
  @ApiBody({ type: UpdateLoteDto })
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateLoteDto) {
    return this.service.update(id, dto);
  }
  @Delete(":id") 
  @Roles("ADMIN")
  @ApiOperation({ summary: "Eliminar lote" }) remove(
    @Param("id", ParseIntPipe) id: number,
  ) {
    return this.service.remove(id);
  }
}*/
