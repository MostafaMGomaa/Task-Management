import { ObjectId } from 'bson';
import { User } from '../users.schema';
import { UsersService } from '../users.service';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';
import { CreateUserDto, UserDto } from '../dto';

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
        return Promise.resolve(filteredUsers)[0];
      },
      create: (data: CreateUserDto): Promise<User> => {
        const { name, email, password, photo, role } = data;
        const user = {
          _id: new ObjectId(),
          email,
          password,
          name,
          photo,
          role,
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
      providers: [
        AuthService,
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
});
