import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const createUserSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
});


export const User = model<TUser>('user', createUserSchema)