import { Types } from "mongoose";

export type preRequisiteCourse = {
    course: Types.ObjectId;
    isDeleted: boolean;
}


export type TCourse = {
    title: string;
    prefix: string;
    code: number;
    credits: number;
    preRequisiteCourse: [];
    isDeleted: boolean;
}