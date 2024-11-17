import { model, Schema } from "mongoose";
import { TAdmin, TUserName } from "./admin.interface";
import AppError from "../../errors/AppError";
import httpStatus from 'http-status';

const UserNameSchema = new Schema<TUserName>({
    firstName: { type: String, required: [true, 'First name is required'] },
    middleName: { type: String },
    lastName: { type: String, required: [true, 'Last name is required'] },
});


const createAdminSchema = new Schema<TAdmin>({
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: true },
    name: { type: UserNameSchema, required: [true, 'Name field is required'] },
    gender: { type: String, enum: ['male', 'female'], required: [true, 'Gender field is required'] },
    email: { type: String, required: [true, 'Email field is required']},
    dateOfBirth: { type: String, required: [true, 'Birth date is required']},
    contactNo: { type: String, required: [true, 'Contact number is required']},
    emergencyContactNo: { type: String, required: [true, 'Emergency contact number is required']},
    bloodGroup: { type: String, enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] },
    presentAddress: { type: String, required: [true, 'Present address is required']},
    permanentAddress: { type: String, required: [true, 'Permanent address is required']},
    managementDepartment: { type: Schema.Types.ObjectId, required: [true, 'Mnagement department id required'], ref: 'department' },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});


createAdminSchema.pre('findOne', async function(next) {
    const query = this.getQuery();
    const isAdminExists = await Admin.find({id: query.id});
    if(isAdminExists.length === 0){
        throw new AppError(httpStatus.NOT_FOUND, 'Admin not found in the database!')
    }
    next();
})


export const Admin = model<TAdmin>('admin', createAdminSchema);