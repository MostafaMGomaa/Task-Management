import { TaskPrioirty, TaskStatus } from '../tasks.schema';
export declare class CreateTaskDto {
    name: string;
    description?: string;
    status?: TaskStatus;
    steps: string[];
    priority?: TaskPrioirty;
    assignTo?: string[];
    startDate?: Date;
    expectedEndDate?: Date;
}
