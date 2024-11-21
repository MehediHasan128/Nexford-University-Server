import { Types } from "mongoose";

export type TPreRequisiteCourse = {
    course: Types.ObjectId;
    isDeleted: boolean;
}


export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    courseCode: string;
    credits: number;
    preRequisiteCourse: [TPreRequisiteCourse];
    isDeleted: boolean;
};


export type TCourseFaculties = {
    course: Types.ObjectId;
    faculties: [Types.ObjectId];
}