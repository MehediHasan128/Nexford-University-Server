import { TOfferedCourse } from "./offeredCourse.interface"
import { OfferedCourse } from "./offeredCourse.model"

const createOfferedCourseIntoDB = async(payload: TOfferedCourse) => {
    const data = await OfferedCourse.create(payload);
    return data;
}



export const OfferedCourseServices = {
    createOfferedCourseIntoDB
}