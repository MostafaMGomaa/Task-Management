import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';

import { Task, TaskDocument } from '../tasks.schema';

@Injectable()
export class AuthorCheckInterceptor implements NestInterceptor {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const userId = req.user.id;
    const taskId = req.params.taskId;

    const task = await this.taskModel.findById(taskId);

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    if (task.author.toString() !== userId) {
      throw new ForbiddenException('You are not the author of this task');
    }

    return next.handle();
  }
}
