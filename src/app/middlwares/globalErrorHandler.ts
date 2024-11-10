/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    })
};

export default globalErrorHandler;



// this is my global error handler function but when i connect to my app.ts page it give a 