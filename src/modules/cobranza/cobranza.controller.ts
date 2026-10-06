import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Req,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CobranzaService } from "./cobranza.service.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
@ApiTags("Cobranzas")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("cobranzas")
export class CobranzaController {
  constructor(private readonly service: CobranzaService) {}
  @Get("deudores")
  @Roles("ADMIN", "COBRANZA")
  @ApiOperation({ summary: "Obtener compradores con deuda" })
  @ApiResponse({ status: 200 })
  deudores() {
    return this.service.deudores();
  }
  @Get("comprador/:id")
  @Roles("ADMIN", "COBRANZA", "CLIENTE")
  @ApiOperation({ summary: "Obtener cuenta corriente de un comprador" })
  @ApiParam({ name: "id", type: Number })
  cuenta(@Param("id", ParseIntPipe) id: number, @Req() req: any) {
    return this.service.cuentaComprador(id, req.user);
  }
}
