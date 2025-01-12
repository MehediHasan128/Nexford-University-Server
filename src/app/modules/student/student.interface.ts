import { Model, Types } from "mongoose";

export type TUSerName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TGuardian = {
  fatherName?: string;
  fatherOccupation?: string;
  fatherContactNo?: string;

  motherName?: string;
  motherOccupation?: string;
  motherContactNo?: string;
};

export type TLoaclGuardian = {
  name?: string;
  occupation?: string;
  contactNo?: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TUSerName;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLoaclGuardian;
  profileImage: string;
  addmistionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
};


// Custom static methods
export interface TStudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>
}



// Custom instance methods

// export type TStudentMethods = {
//   isUserExists(id: string): Promise<TStudent | null> 
// }

// export type TStudentModel = Model<TStudent, Record<string, never>, TStudentMethods>