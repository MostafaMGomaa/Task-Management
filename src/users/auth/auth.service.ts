import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from '../dto/jwt.dto';
import { LoginDto } from '../dto/login.dto';
import { UserRoles } from '../../enums';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // TODO: Upload images.
  async signup(data: CreateUserDto) {
    const existsUser = await this.usersService.findOne(data.email);

    if (existsUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(
      data.password,
      parseInt(this.config.get<string>('SALT_ROUND')),
    );
    const newUser = await this.usersService.create({
      name: data.name,
      email: data.email,
      photo: data.photo,
      password: hashedPassword,
      role: UserRoles.User,
    });

    const token = await this.genrateToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      photo: newUser.photo,
      role: newUser.role,
      token,
    };
  }

  async login(data: LoginDto) {
    const user = await this.usersService.findOne(data.email);
    if (!user) {
      throw new ForbiddenException('Invalid email or password');
    }

    const pwMatch = bcrypt.compareSync(data.password, user.password);
    if (!pwMatch) {
      throw new ForbiddenException('Invalid email or password');
    }
    const token = await this.genrateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { name: user.name, token };
  }

  async genrateToken(data: JwtDto): Promise<string> {
    const payload = {
      id: data.id,
      email: data.email,
      role: data.role,
    };

    return await this.jwt.signAsync(payload, {
      expiresIn: '8h',
      secret: this.config.get<string>('JWT_SECRET'),
    });
  }
}
