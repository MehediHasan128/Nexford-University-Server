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
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};
