import { TaskPrioirty, TaskStatus } from '../tasks.schema';
export declare class UpdateTaskDto {
    name?: string;
    description?: string;
    status?: TaskStatus;
    steps: string[];
    priority?: TaskPrioirty;
    assignTo?: string[];
    startDate?: Date;
    expectedEndDate?: Date;
}
