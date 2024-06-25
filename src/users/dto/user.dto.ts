import { UserRoles } from '../users.schema';
import { Types } from 'mongoose';

export class UserDto {
  _id: Types.ObjectId;

  name: string;

  email: string;

  photo: string;

  role: UserRoles;

  token: string;
}
