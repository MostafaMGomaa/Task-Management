import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async find() {
    return await this.userModel.find();
  }

  async findOne(email: string) {
    return await this.userModel
      .findOne({ email })
      .select('_id name email photo password role');
  }

  async create(data: CreateUserDto) {
    return (await this.userModel.create(data)).save();
  }
}
