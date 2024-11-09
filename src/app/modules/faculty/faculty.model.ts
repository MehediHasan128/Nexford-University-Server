import { model, Schema } from "mongoose";
import { TFaculty, TUSerName } from "./faculty.interface";

const userNameSchema = new Schema<TUSerName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const createFacultySchema = new Schema<TFaculty>(
  {
    id: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, required: [true, 'User id is required'], unique: true, ref: 'User' },
    name: userNameSchema,
    designation: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], required: true },
    email: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      required: false,
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    academicDepartment: { type: Schema.Types.ObjectId, required: [true, 'Academic Department is required'], ref: 'department' },
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  },
);


export const Faculty = model<TFaculty>('faculties', createFacultySchema);
