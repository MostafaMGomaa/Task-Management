/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import monggoose, { HydratedDocument } from 'mongoose';
export declare enum TaskPrioirty {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
export declare enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export type TaskDocument = HydratedDocument<Task>;
export declare class Task {
    name: string;
    description: string;
    status: string;
    steps: string[];
    priority: TaskPrioirty;
    author: monggoose.Schema.Types.ObjectId;
    assignTo: monggoose.Schema.Types.ObjectId[];
    startDate: Date;
    endDate: Date;
    expectedEndDate: Date;
    isOverdue: boolean;
}
export declare const TaskSchema: monggoose.Schema<Task, monggoose.Model<Task, any, any, any, monggoose.Document<unknown, any, Task> & Task & {
    _id: monggoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, monggoose.DefaultSchemaOptions, Task, monggoose.Document<unknown, {}, monggoose.FlatRecord<Task>> & monggoose.FlatRecord<Task> & {
    _id: monggoose.Types.ObjectId;
}>;
