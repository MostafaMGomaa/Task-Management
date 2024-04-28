import { UserRoles } from '../users.schema';
export declare class CreateUserDto {
    name: string;
    email: string;
    photo: string;
    password: string;
    role?: UserRoles.User;
}
