import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CotizacionService } from "./cotizacion.service.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
@ApiTags("Cotización")
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller("cotizacion")
export class CotizacionController {
  constructor(private readonly service: CotizacionService) {}
  @Get("dolar")
  @ApiOperation({ summary: "Obtener cotización del dólar" })
  @ApiResponse({ status: 200 })
  dolar() {
    return this.service.dolar();
  }
}
