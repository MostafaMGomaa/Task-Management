import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { JwtAuthGuard } from 'src/users/auth/jwt-auth.guard';
import { AuthorCheckInterceptor } from './interceptors';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  getTaskByUserId(@Req() req) {
    return this.tasksService.getTaskByUserId(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthorCheckInterceptor)
  @Patch('/:taskId/users/:userId')
  @HttpCode(200)
  assignTaskToUser(@Req() req) {
    return this.tasksService.assignTaskToUser(
      req.params.taskId,
      req.params.userId,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('/users/assigned')
  getAssignedTasks(@Req() req) {
    return this.tasksService.getAssignedTasks(req.user.id);
  }

  @Get()
  getTasks() {
    return this.tasksService.findAll();
  }

  @Get('/:id')
  getTask(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createTask(@Body() task: CreateTaskDto, @Req() req) {
    task.author = req.user.id;
    return this.tasksService.create(task);
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.update(id, task);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteTask(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
