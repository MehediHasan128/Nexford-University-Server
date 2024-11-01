import { model, Schema } from 'mongoose';
import {
  TGuardian,
  TLoaclGuardian,
  TStudent,
  TUSerName,
} from './student.interface';

const userNameSchema = new Schema<TUSerName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
  },
  fatherOccupation: {
    type: String,
  },
  fatherContactNo: {
    type: String,
  },
  motherName: {
    type: String,
  },
  motherOccupation: {
    type: String,
  },
  motherContactNo: {
    type: String,
  },
});

const localGuardianSchema = new Schema<TLoaclGuardian>({
  name: {
    type: String,
  },
  occupation: {
    type: String,
  },
  contactNo: {
    type: String,
  },
});

const createStudentSchema = new Schema<TStudent>(
  {
    id: { type: String, required: true },
    name: userNameSchema,
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
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    isDeleted: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  },
);

export const Student = model<TStudent>('student', createStudentSchema);
