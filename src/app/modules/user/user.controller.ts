import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";

const createStudentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {password, student: studentData} = req.body;
    
        const result = await UserServices.createStudentUserIntoDB(password, studentData);
    
        res.status(200).json({
          success: true,
          message: 'Student is created successfully',
          data: result,
        });
      } catch (err) {
        next(err)
      }
};

export const UserController = {
    createStudentUser
}