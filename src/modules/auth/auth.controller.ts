import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service.js";
import { LoginDto } from "./dto/login.dto.js";
import { AuthGuard } from "../../common/guards/auth.guard.js";
@ApiTags("Autenticación")
@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post("login")
  @ApiOperation({ summary: "Iniciar sesión" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 401, description: "Credenciales inválidas" })
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }
  @Get("me")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Obtener usuario autenticado" })
  me(@Req() req: any) {
    return this.service.me(req.user.id);
  }
}
