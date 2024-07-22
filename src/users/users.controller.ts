import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UseFilters,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

import { CreateUserDto } from './dto';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard, RolesGuard } from 'src/guards';
import { storage } from 'src/utils';
import { Roles } from 'src/decorators';
import { UserRoles } from '../enums';
import { MongoExceptionFilter } from 'src/filters';

@Controller('users')
@UseFilters(MongoExceptionFilter)
export class UsersController {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.Admin)
  getAll() {
    return this.userService.find();
  }

  @Post('signup')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage,
    }),
  )
  signup(
    @Body() data: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    data.photo = photo.filename;
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
