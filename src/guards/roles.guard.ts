import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorators';
import { UserRoles } from 'src/users/users.schema';

/**
 * `RolesGuard` class which will compare the roles assigned to the current user to the actual roles required by the current route being processed.
 * In order to access the route's role(s) (custom metadata)
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requireRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      console.error('No user found in request');
      return false;
    }
    // return true;
    return requireRoles.some((role) => user.role?.includes(role));
  }
}
