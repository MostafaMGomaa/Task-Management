import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { isEmail } from 'class-validator';
import { UserRoles } from 'src/enums';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    required: [true, 'Please tell us your name!'],
    trim: true,
    lowercase: true,
  })
  name: string;

  @Prop({
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please provide a vaild email'],
  })
  email: string;

  @Prop({
    default: 'user-default-photo.jpg',
  })
  photo: string;

  @Prop({
    default: 'user',
    enum: Object.values(UserRoles),
  })
  role: UserRoles;

  @Prop({
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  })
  password: string;

  @Prop()
  passwordChangedAt: Date;

  @Prop()
  passwordResetToken: string;

  @Prop()
  passwordResetExpires: Date;

  @Prop({
    default: true,
    select: false,
  })
  active: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
