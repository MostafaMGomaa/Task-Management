import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './tasks.schema';
import { Model } from 'mongoose';
import { UpdateTaskDto, CreateTaskDto } from './dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskModel.create(createTaskDto);
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    return this.taskModel.findById(id).exec();
  }

  async update(id: string, taskDto: UpdateTaskDto): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, taskDto, { new: true });
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id);
  }

  async getTaskByUserId(userId: string): Promise<Task[]> {
    return this.taskModel.find({ author: userId }).exec();
  }

  // Get the tasks which user assigned to is array of _ids of users
  async getAssignedTasks(userId: string): Promise<Task[]> {
    return this.taskModel.find({ assignTo: { $in: [userId] } }).exec();
  }
}
