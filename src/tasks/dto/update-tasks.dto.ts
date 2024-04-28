import { TaskPrioirty, TaskStatus } from '../tasks.schema';
import { IsArray, IsDate, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsArray()
  steps: string[];

  @IsOptional()
  @IsEnum(TaskPrioirty)
  priority?: TaskPrioirty;

  @IsOptional()
  @IsString()
  assignTo?: string[];

  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  expectedEndDate?: Date;
}
