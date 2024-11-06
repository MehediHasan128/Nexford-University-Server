import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDB = async(payload: TStudent) => {
    if(await Student.isUserExists(payload.id)){
        throw new Error('User is already exists');
    }
    const result = await Student.create(payload);
    return result


    // Instance methods

    // const student = new Student(payload);

    // if(await student.isUserExists(payload.id)){
    //     throw new Error('User is already exists');
    // }

    // const result = await student.save();
    // return result;
};

export const StudentServices = {
    createStudentIntoDB
}