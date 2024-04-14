import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, UserDto } from './dto';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

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

  @Post('login')
  @HttpCode(200)
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req) {
    return this.userService.findOne(req.user.email);
  }
}
