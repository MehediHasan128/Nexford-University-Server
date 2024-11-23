import { TSemesterRegistration } from "./semesterRegistration.interface"
import { SemesterRegistration } from "./semesterRegistration.model"

const createSemesterRegistrationIntoDB = async(payload: TSemesterRegistration) => {
    const data = await SemesterRegistration.create(payload);
    return data;
}


export const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB
}