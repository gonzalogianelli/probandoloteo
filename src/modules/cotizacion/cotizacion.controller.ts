import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CotizacionService } from "./cotizacion.service.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
@ApiTags("Cotización")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller("cotizacion")
export class CotizacionController {
  constructor(private readonly service: CotizacionService) {}
  @Get("dolar")
  @Roles("ADMIN", "VENTAS", "COBRANZA")
  @ApiOperation({ summary: "Obtener cotización del dólar" })
  @ApiResponse({ status: 200 })
  dolar() {
    return this.service.dolar();
  }
}
