import { Controller, Get, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DashboardService } from "./dashboard.service.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
import { RolesGuard } from "../../common/guards/roles.guard.js";
import { Roles } from "../../common/decorators/roles.decorator.js";
@ApiTags("Dashboard")
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Roles("ADMIN")
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly service: DashboardService) {}
  @Get()
  @ApiOperation({ summary: "Obtener indicadores del dashboard" })
  @ApiResponse({ status: 200 })
  dashboard() {
    return this.service.dashboard();
  }
}
