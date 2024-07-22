import { BadRequestException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { User } from '../users.schema';
import { UsersService } from '../users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../dto';
import { ObjectId } from 'bson';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  let users: User[] = [];

  beforeEach(async () => {
    fakeUserService = {
      find: (): Promise<User[]> => {
        return Promise.resolve(users);
      },
      findOne: (email: string): Promise<User> => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers[0]);
      },
      create: (data: CreateUserDto): Promise<User> => {
        const { name, email, password, photo, role } = data;
        const user = {
          email,
          password,
          name,
          photo,
          role: role || 'user',
          passwordChangedAt: null,
          passwordResetToken: null,
          passwordResetExpires: null,
          active: true,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: `.env.${process.env.NODE_ENV}`,
        }),
      ],
      providers: [
        AuthService,
        JwtService,
        ConfigService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
    users = [];
  });

  it('Auth service should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('creates a new user', async () => {
    const userData = {
      id: new ObjectId(),
      name: 'mostafa',
      email: 'gomaamostafa26@gmail.com',
      password: '123456789',
      photo: 'default.jpg',
    } as CreateUserDto;
    const user = await service.signup(userData);
    expect(user).toBeDefined();
  });

  it('throws an error if user signs up with an email that is in use', async () => {
    const userData = {
      id: new ObjectId(),
      name: 'mostafa',
      email: 'gomaamostafa26@gmail.com',
      password: '123456789',
      photo: 'default.jpg',
    } as CreateUserDto;
    await service.signup(userData);

    userData.password = 'incorrect password';
    await expect(service.signup(userData)).rejects.toThrow(BadRequestException);
  });
});
