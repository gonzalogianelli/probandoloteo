import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
@ApiTags("Sistema")
@Controller()
export class AppController {
  @Get("health")
  @ApiOperation({ summary: "Verificar estado de la API" })
  @ApiResponse({ status: 200 })
  health() {
    return {
      statusCode: 200,
      message: "API Loteo Balcarce Norte operativa",
      data: {
        service: "loteo-balcarce-norte",
        timestamp: new Date().toISOString(),
      },
    };
  }
}
