import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get()
  getAll() {
    return this.userService.find();
  }

  @Post('signup')
  signup(@Body() data: CreateUserDto) {
    return this.authService.signup(data);
  }
}
