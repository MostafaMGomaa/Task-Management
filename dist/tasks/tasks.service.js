"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const tasks_schema_1 = require("./tasks.schema");
const mongoose_2 = require("mongoose");
let TasksService = class TasksService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async create(createTaskDto) {
        return this.taskModel.create(createTaskDto);
    }
    async findAll() {
        return this.taskModel.find().exec();
    }
    async findOne(id) {
        return this.taskModel.findById(id).exec();
    }
    async update(id, taskDto) {
        return this.taskModel.findByIdAndUpdate(id, taskDto, { new: true });
    }
    async delete(id) {
        return this.taskModel.findByIdAndDelete(id);
    }
    async getTaskByUserId(userId) {
        return this.taskModel.find({ author: userId }).exec();
    }
    async getAssignedTasks(userId) {
        return this.taskModel.find({ assignTo: { $in: [userId] } }).exec();
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(tasks_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksService);
//# sourceMappingURL=tasks.service.js.map