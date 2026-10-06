import { Module } from "@nestjs/common";
import { CotizacionController } from "./cotizacion.controller.js";
import { CotizacionService } from "./cotizacion.service.js";
@Module({ controllers: [CotizacionController], providers: [CotizacionService] })
export class CotizacionModule {}
