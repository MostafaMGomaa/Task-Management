import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.findAll();
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  createTask(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.update(id, task);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('tasks/:id/users')
  getUsers(@Req() req) {
    return this.tasksService.getTaskByUserId(req.user.id);
  }
}
