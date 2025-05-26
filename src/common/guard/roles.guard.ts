
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from 'src/common/decorator/require-permissions.decorator';
// import { User } from 'src/modules/user/schemas/user.schema';


@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );
    if (!requiredPermissions) return true;
    const request = context.switchToHttp().getRequest();
    const user: any = request.user; 
    const hasPermission = requiredPermissions.every(permission => 
      user.role?.permissions?.includes(permission)
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        `No tienes permisos suficientes. Requeridos: ${requiredPermissions.join(', ')}`,
      );
    }

    return true;
  }
}