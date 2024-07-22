import { Schema, Types } from 'mongoose';
import { UserRoles } from '../../enums';

export interface JwtDto {
  id: Schema.Types.ObjectId;

  email: string;

  role: UserRoles;
}
