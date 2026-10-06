import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { User } from "../usuario/entities/user.entity.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        secret: c.get("JWT_SECRET", "dev-secret"),
        signOptions: { expiresIn: c.get("JWT_EXPIRES_IN", "8h") },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
