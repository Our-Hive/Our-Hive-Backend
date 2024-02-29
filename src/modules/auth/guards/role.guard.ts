import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PayloadToken } from '../models/token.model';
import { UserRole } from 'src/modules/user/entities/enums/role.enum';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user = request.user as PayloadToken;

    const isAuth = requiredRoles.includes(user.role as UserRole);
    if (!isAuth) {
      throw new ForbiddenException('Your role is not authorized');
    }
    return isAuth;
  }
}
