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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.UserRoles = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
var UserRoles;
(function (UserRoles) {
    UserRoles["User"] = "user";
    UserRoles["Admin"] = "admin";
})(UserRoles || (exports.UserRoles = UserRoles = {}));
let User = class User {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Please tell us your name!'],
        trim: true,
        lowercase: true,
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [class_validator_1.isEmail, 'Please provide a vaild email'],
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 'user-default-photo.jpg',
    }),
    __metadata("design:type", String)
], User.prototype, "photo", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: 'user',
        enum: Object.values(UserRoles),
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false,
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "passwordChangedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], User.prototype, "passwordResetExpires", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        default: true,
        select: false,
    }),
    __metadata("design:type", Boolean)
], User.prototype, "active", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=users.schema.js.map