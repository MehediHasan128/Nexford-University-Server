import { Types } from "mongoose"

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: 'Upcomming' | 'Ongoing' | 'Ended';
    startDate: Date;
    endDate: Date;
    startTime: Date;
    endTime: Date;
    minCredits: number;
    maxCredits: number;
}