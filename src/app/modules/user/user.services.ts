import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generatedStudentId } from "./user.utils";

const createStudentUserIntoDB = async (password: string, payload: TStudent) => {

    // Create a user object
    const userData: Partial<TUser> = {};

    // if password is not given use default password
    userData.password = password || config.default_pass as string;

    // Set student role
    userData.role = 'student';
    
    // auto denerated student id
    const addmissionSemester = await AcademicSemester.findById(payload.addmistionSemester);
    userData.id = await generatedStudentId(addmissionSemester as TAcademicSemester);

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