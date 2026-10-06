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
  Req,
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
import { VentaService } from "./venta.service.js";
import { CreateVentaDto } from "./dto/create-venta.dto.js";
import { UpdateVentaDto } from "./dto/update-venta.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
@ApiTags("Ventas")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("ventas")
export class VentaController {
  constructor(private readonly service: VentaService) {}
  @Get()
  @Roles("ADMIN", "VENTA", "COBRANZA", "CLIENTE")
  @ApiOperation({ summary: "Listar ventas" })
  findAll(@Query() q: PaginationDto, @Req() req: any) {
    return this.service.findAll(q, req.user);
  }
  @Get(":id")
  @Roles("ADMIN", "VENTA", "COBRANZA", "CLIENTE")
  @ApiOperation({ summary: "Obtener venta por ID" })
  @ApiParam({ name: "id", type: Number })
  getById(@Param("id", ParseIntPipe) id: number, @Req() req: any) {
    return this.service.getById(id, req.user);
  }
  @Post()
  @Roles("ADMIN", "VENTA")
  @ApiOperation({ summary: "Registrar una venta y generar sus cuotas" })
  @ApiBody({ type: CreateVentaDto })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreateVentaDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }
  @Patch(":id")
  @Roles("ADMIN", "VENTA")
  @ApiOperation({ summary: "Actualizar una venta" })
  @ApiBody({ type: UpdateVentaDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateVentaDto,
    @Req() req: any,
  ) {
    return this.service.update(id, dto, req.user);
  }
  @Delete(":id")
  @Roles("ADMIN")
  @ApiOperation({ summary: "Eliminar una venta no activa" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
