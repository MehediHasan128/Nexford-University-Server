import { Types } from "mongoose"

export type TSemesterRegistration = {
    academicSemester: Types.ObjectId;
    status: 'UPCOMING' | 'ONGOING' | 'ENDED';
    startDate: string;
    endDate: string;
    minCredits: number;
    maxCredits: number;
}