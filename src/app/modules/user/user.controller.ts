/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { UserServices } from "./user.services";

const createStudentUser = async (req: Request, res: Response) => {
    try {
        const {password, student: studentData} = req.body;
    
        const result = await UserServices.createStudentUserIntoDB(password, studentData);
    
        res.status(200).json({
          success: true,
          message: 'Student is created successfully',
          data: result,
        });
      } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message,
          error: err
        })
      }
};

export const UserController = {
    createStudentUser
}