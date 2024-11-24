import { Types } from "mongoose"
import { TDays } from "./offeredCourse.constant";

export type TOfferedCourse = {
    academicSemester: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    section: string;
    studentCapacity: number;
    classSchedule: TDays;
    startTime: string;
    endTime: string;
}