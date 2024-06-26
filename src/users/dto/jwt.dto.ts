import { Types } from 'mongoose';
import { UserRoles } from 'src/enums';

export interface JwtDto {
  id: Types.ObjectId;

  email: string;

  role: UserRoles;
}
