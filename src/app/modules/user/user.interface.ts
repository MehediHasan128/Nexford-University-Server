import { userRole } from "./user.constant";

export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    passwordChangeAt?: Date;
    role: 'student' | 'faculty' | 'admin';
    status: 'active' | 'blocked';
    isDeleted: boolean;
}

export type TUserRole = keyof typeof userRole;