import { Prop, SchemaFactory } from '@nestjs/mongoose';
import monggoose, { HydratedDocument } from 'mongoose';

export enum TaskPrioirty {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type TaskDocument = HydratedDocument<Task>;

export class Task {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: TaskStatus.OPEN })
  status: string;

  @Prop()
  steps: string[];

  @Prop({ default: TaskPrioirty.MEDIUM })
  priority: TaskPrioirty;

  @Prop({ required: true })
  author: monggoose.Schema.Types.ObjectId;

  @Prop()
  assignTo: monggoose.Schema.Types.ObjectId[];

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  expectedEndDate: Date;

  @Prop()
  isOverdue: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
