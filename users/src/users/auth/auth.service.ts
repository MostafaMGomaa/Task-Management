import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto';
import { UserRoles } from '../users.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtDto } from '../dto/jwt.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(data: CreateUserDto) {
    console.log(data.password.length);
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
      id: newUser._id,
      email: newUser.email,
      role: newUser.role,
    });

    return {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      photo: newUser.photo,
      role: newUser.role,
      token,
    };
  }

  async genrateToken(data: JwtDto): Promise<string> {
    const payload = { id: data.id, email: data.email, role: data.role };

    return await this.jwt.signAsync(payload, {
      expiresIn: '8h',
      secret: this.config.get<string>('JWT_SECRET'),
    });
  }
}
