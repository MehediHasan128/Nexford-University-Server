import { Types } from "mongoose";

export type TUSerName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TFaculty = {
  id: string;
  user: Types.ObjectId;
  name: TUSerName;
  designation: string;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};