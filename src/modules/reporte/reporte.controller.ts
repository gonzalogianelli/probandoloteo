import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ReporteService } from "./reporte.service.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
@ApiTags("Reportes")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles("ADMIN")
@Controller("reportes")
export class ReporteController {
  constructor(private readonly service: ReporteService) {}
  @Get("ventas")
  @ApiOperation({ summary: "Reporte de estado de lotes" })
  @ApiResponse({ status: 200 })
  ventas() {
    return this.service.reporteVentas();
  }
  @Get("deudores")
  @ApiOperation({ summary: "Reporte de deudores" })
  deudores() {
    return this.service.deudores();
  }
}
