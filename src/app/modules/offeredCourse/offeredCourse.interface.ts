import { Types } from 'mongoose';
import { TDays } from './offeredCourse.constant';

export type TOfferedCourse = {
  semesterRegistration: Types.ObjectId;
  academicSemester: Types.ObjectId | undefined;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  course: Types.ObjectId;
  faculty: Types.ObjectId;
  section: string;
  maxCapacity: number;
  classSchedule: TDays[];
  startTime: string;
  endTime: string;
};

export type TSchedules = {
  classSchedule: TDays[];
  startTime: string;
  endTime: string;
};
