import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(): Promise<import("./tasks.schema").Task[]>;
    getTask(id: string): Promise<import("./tasks.schema").Task>;
    createTask(task: CreateTaskDto): Promise<import("./tasks.schema").Task>;
    updateTask(id: string, task: UpdateTaskDto): Promise<import("./tasks.schema").Task>;
    deleteTask(id: string): Promise<import("./tasks.schema").Task>;
    getUsers(req: any): Promise<import("./tasks.schema").Task[]>;
}
