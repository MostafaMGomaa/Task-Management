import mongoose from 'mongoose';
import { TaskPriority, TaskStatus } from 'src/enums';

export class TaskDto {
  id: mongoose.Types.ObjectId;

  name: string;

  description: string;

  status: TaskStatus;

  steps: string[];

  priority: TaskPriority;

  author: mongoose.Types.ObjectId;

  assignTo: mongoose.Types.ObjectId[];

  startDate: Date;

  endDate: Date;

  expectedEndDate: Date;

  isOverdue: boolean;
}
