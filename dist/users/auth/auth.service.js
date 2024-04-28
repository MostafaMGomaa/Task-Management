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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const users_service_1 = require("../users.service");
const users_schema_1 = require("../users.schema");
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(usersService, jwt, config) {
        this.usersService = usersService;
        this.jwt = jwt;
        this.config = config;
    }
    async signup(data) {
        const hashedPassword = await bcrypt.hash(data.password, parseInt(this.config.get('SALT_ROUND')));
        const newUser = await this.usersService.create({
            name: data.name,
            email: data.email,
            photo: data.photo,
            password: hashedPassword,
            role: users_schema_1.UserRoles.User,
        });
        const token = await this.genrateToken({
            id: newUser._id,
            email: newUser.email,
            role: newUser.role,
        });
        return {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            photo: newUser.photo,
            role: newUser.role,
            token,
        };
    }
    async login(data) {
        const user = await this.usersService.findOne(data.email);
        if (!user) {
            throw new common_1.ForbiddenException('Invalid email or password');
        }
        const pwMatch = bcrypt.compareSync(data.password, user.password);
        if (!pwMatch) {
            throw new common_1.ForbiddenException('Invalid email or password');
        }
        const token = await this.genrateToken({
            id: user._id,
            email: user.email,
            role: user.role,
        });
        return { name: user.name, token };
    }
    async genrateToken(data) {
        const payload = {
            id: data.id,
            email: data.email,
            role: data.role,
        };
        return await this.jwt.signAsync(payload, {
            expiresIn: '8h',
            secret: this.config.get('JWT_SECRET'),
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map