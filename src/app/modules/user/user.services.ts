import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentUserIntoDB = async (password: string, payload: TStudent) => {

    // Create a user object
    const userData: Partial<TUser> = {};

    // if password is not given use default password
    userData.password = password || config.default_pass as string;

    // Set student role
    userData.role = 'student';

    // set menually generated Student id
    userData.id = '203010001';

    // Create user into DB
    const newUser = await User.create(userData);


    // Create a student
    if(Object.keys(newUser).length){
        payload.id = newUser.id;
        payload.user = newUser._id;

        // Create student into DB
        const newStudent = await Student.create(payload);
        return newStudent;
    }

};


export const UserServices = {
    createStudentUserIntoDB
}