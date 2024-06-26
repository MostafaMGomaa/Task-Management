import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TaskPriority, TaskStatus } from 'src/enums';

export type TaskDocument = HydratedDocument<Task>;

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: String, enum: TaskStatus, default: TaskStatus.OPEN })
  status: TaskStatus;

  @Prop()
  steps: string[];

  @Prop({ type: String, enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: mongoose.Schema.Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  assignTo: mongoose.Schema.Types.ObjectId[];

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  expectedEndDate: Date;

  @Prop({ default: false })
  isOverdue: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
