var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { Role } from "./modules/rol/entities/rol.entity.js";
import { Loteo } from "./modules/loteo/entities/loteo.entity.js";
import { Manzana } from "./modules/manzana/entities/manzana.entity.js";
import { Servicio } from "./modules/servicio/entities/servicio.entity.js";
import { Lote } from "./modules/lote/entities/lote.entity.js";
import { LoteServicio } from "./modules/lote-servicio/entities/lote-servicio.entity.js";
import { PlanPago } from "./modules/plan/entities/plan.entity.js";
import { User } from "./modules/usuario/entities/user.entity.js";
import { Venta } from "./modules/venta/entities/venta.entity.js";
import { Cuota } from "./modules/cuota/entities/cuota.entity.js";
import { MedioPago } from "./modules/medio/entities/medio.entity.js";
import { Pago } from "./modules/pago/entities/pago.entity.js";
import { PagoCuota } from "./modules/pago-cuota/entities/pago-cuota.entity.js";
import { PagoMedio } from "./modules/pago-medio/entities/pago-medio.entity.js";
import { AuthModule } from "./modules/auth/auth.module.js";
import { RolModule } from "./modules/rol/rol.module.js";
import { LoteoModule } from "./modules/loteo/loteo.module.js";
import { ManzanaModule } from "./modules/manzana/manzana.module.js";
import { ServicioModule } from "./modules/servicio/servicio.module.js";
import { LoteModule } from "./modules/lote/lote.module.js";
import { LoteServicioModule } from "./modules/lote-servicio/lote-servicio.module.js";
import { PlanModule } from "./modules/plan/plan.module.js";
import { UsuarioModule } from "./modules/usuario/usuario.module.js";
import { VentaModule } from "./modules/venta/venta.module.js";
import { CuotaModule } from "./modules/cuota/cuota.module.js";
import { MedioModule } from "./modules/medio/medio.module.js";
import { PagoModule } from "./modules/pago/pago.module.js";
import { PagoCuotaModule } from "./modules/pago-cuota/pago-cuota.module.js";
import { PagoMedioModule } from "./modules/pago-medio/pago-medio.module.js";
import { CobranzaModule } from "./modules/cobranza/cobranza.module.js";
import { ReporteModule } from "./modules/reporte/reporte.module.js";
import { DashboardModule } from "./modules/dashboard/dashboard.module.js";
import { CotizacionModule } from "./modules/cotizacion/cotizacion.module.js";
import { UploadModule } from "./modules/upload/upload.module.js";
let AppModule = class AppModule {
};
AppModule = __decorate([
    Module({
        imports: [
            ConfigModule.forRoot({ isGlobal: true }),
            TypeOrmModule.forRootAsync({
                inject: [ConfigService],
                useFactory: (c) => ({
                    type: "mysql",
                    host: c.get("DB_HOST", "localhost"),
                    port: Number(c.get("DB_PORT", 3306)),
                    username: c.get("DB_USERNAME", "root"),
                    password: c.get("DB_PASSWORD", ""),
                    database: c.get("DB_DATABASE", "loteo_balcarce_norte"),
                    entities: [
                        Role,
                        Loteo,
                        Manzana,
                        Servicio,
                        Lote,
                        PlanPago,
                        User,
                        Venta,
                        LoteServicio,
                        Cuota,
                        MedioPago,
                        Pago,
                        PagoCuota,
                        PagoMedio,
                    ],
                    synchronize: false,
                }),
            }),
            JwtModule.registerAsync({
                global: true,
                inject: [ConfigService],
                useFactory: (c) => ({
                    secret: c.get("JWT_SECRET", "dev-secret"),
                    signOptions: { expiresIn: c.get("JWT_EXPIRES_IN", "8h") },
                }),
            }),
            AuthModule,
            RolModule,
            LoteoModule,
            ManzanaModule,
            ServicioModule,
            LoteModule,
            LoteServicioModule,
            PlanModule,
            UsuarioModule,
            VentaModule,
            CuotaModule,
            MedioModule,
            PagoModule,
            PagoCuotaModule,
            PagoMedioModule,
            CobranzaModule,
            ReporteModule,
            DashboardModule,
            CotizacionModule,
            UploadModule,
        ],
        controllers: [AppController],
        providers: [AppService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map