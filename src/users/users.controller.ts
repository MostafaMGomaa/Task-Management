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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Express } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { CreateUserDto } from './dto';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from 'src/guards';

const storage = diskStorage({
  destination: 'uploads',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `${name}-${randomName}${extension}`);
  },
});

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
