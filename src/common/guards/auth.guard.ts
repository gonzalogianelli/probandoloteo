import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const header = request.headers.authorization as string | undefined;
    if (!header?.startsWith("Bearer "))
      throw new UnauthorizedException("Token de acceso requerido");
    try {
      request.user = this.jwt.verify(header.slice(7));
      return true;
    } catch {
      throw new UnauthorizedException("Token inválido o expirado");
    }
  }
}
