import mongoose from 'mongoose';
import { TaskPrioirty, TaskStatus } from '../tasks.schema';

export class TaskDto {
  id: mongoose.Types.ObjectId;

  name: string;

  description: string;

  status: TaskStatus;

  steps: string[];

  priority: TaskPrioirty;

  author: mongoose.Types.ObjectId;

  assignTo: mongoose.Types.ObjectId[];

  startDate: Date;

  endDate: Date;

  expectedEndDate: Date;

  isOverdue: boolean;
}
