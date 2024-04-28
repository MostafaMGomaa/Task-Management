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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto';
import { UserRoles } from '../users.schema';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from '../dto/jwt.dto';
import { LoginDto } from '../dto/login.dto';
export declare class AuthService {
    private usersService;
    private jwt;
    private config;
    constructor(usersService: UsersService, jwt: JwtService, config: ConfigService);
    signup(data: CreateUserDto): Promise<{
        id: import("mongoose").Types.ObjectId;
        name: string;
        email: string;
        photo: string;
        role: UserRoles;
        token: string;
    }>;
    login(data: LoginDto): Promise<{
        name: string;
        token: string;
    }>;
    genrateToken(data: JwtDto): Promise<string>;
}
