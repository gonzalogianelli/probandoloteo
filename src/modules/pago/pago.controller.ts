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
import { PagoService } from "./pago.service.js";
import { CreatePagoDto } from "./dto/create-pago.dto.js";
import { UpdatePagoDto } from "./dto/update-pago.dto.js";
import { PaginationDto } from "../../common/dto/pagination.dto.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
@ApiTags("Pagos")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("pagos")
export class PagoController {
  constructor(private readonly service: PagoService) {}
  @Get()
  @Roles("ADMIN", "COBRANZA", "VENTA", "CLIENTE")
  @ApiOperation({ summary: "Listar pagos" })
  findAll(@Query() q: PaginationDto, @Req() req: any) {
    return this.service.findAll(q, req.user);
  }
  @Get(":id")
  @Roles("ADMIN", "COBRANZA", "VENTA", "CLIENTE")
  @ApiOperation({ summary: "Obtener pago por ID" })
  @ApiParam({ name: "id", type: Number })
  getById(@Param("id", ParseIntPipe) id: number, @Req() req: any) {
    return this.service.getById(id, req.user);
  }
  @Post()
  @Roles("ADMIN", "COBRANZA")
  @ApiOperation({ summary: "Registrar pago y aplicar saldo a cuotas" })
  @ApiBody({ type: CreatePagoDto })
  @ApiResponse({ status: 201 })
  create(@Body() dto: CreatePagoDto, @Req() req: any) {
    return this.service.create(dto, req.user);
  }
  @Patch(":id")
  @Roles("ADMIN", "COBRANZA")
  @ApiOperation({ summary: "Actualizar pago" })
  @ApiBody({ type: UpdatePagoDto })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePagoDto,
    @Req() req: any,
  ) {
    return this.service.update(id, dto, req.user);
  }
  @Delete(":id")
  @Roles("ADMIN", "COBRANZA")
  @ApiOperation({ summary: "Eliminar pago" })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
