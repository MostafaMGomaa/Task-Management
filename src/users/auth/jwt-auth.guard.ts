import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      console.error('Error in JwtAuthGuard:', err || 'No user found'); // Error log
      throw err || new UnauthorizedException();
    }
    console.log('JwtAuthGuard User:', user); // Debug log
    return user;
  }
}
