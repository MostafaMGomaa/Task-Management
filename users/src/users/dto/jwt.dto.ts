import { ObjectId, Types } from 'mongoose';
import { UserRoles } from '../users.schema';

export interface JwtDto {
  id: Types.ObjectId;

  email: string;

  role: UserRoles;
}
