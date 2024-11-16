import { Types } from "mongoose";

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  managementDepartment: Types.ObjectId;
  isDeleted: boolean;
};