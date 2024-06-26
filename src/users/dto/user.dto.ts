import { Types } from 'mongoose';
import { UserRoles } from 'src/enums';

export class UserDto {
  _id: Types.ObjectId;

  name: string;

  email: string;

  photo: string;

  role: UserRoles;

  token: string;
}
