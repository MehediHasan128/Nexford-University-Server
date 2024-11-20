/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handelZodError from "../errors/handelZodError";
import handelValidationError from "../errors/handelValidationError";
import handelCastError from "../errors/handelCastError";
import handelDuplicateError from "../errors/handelDuplicateError";
import AppError from "../errors/AppError";

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = 'Something went wrong';
    let errorSources: TErrorSources = [{
        path: '',
        message: 'Something went wrong'
    }];


    
    if(err instanceof ZodError){
        const simplifiedError = handelZodError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources
    }else if(err?.name === 'ValidationError'){
        const simplifiedError = handelValidationError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }else if(err?.name === 'CastError'){
        const simplifiedError = handelCastError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }else if(err?.code === 11000){
        const simplifiedError = handelDuplicateError(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }else if(err instanceof AppError){
        statusCode = err?.statusCode,
        message = err?.message,
        errorSources = [{
            path: '',
            message: err?.message
        }]
    }else if(err instanceof Error){
        message = err.message;
        errorSources = [{
            path: '',
            message: err.message
        }]
    }




    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.node_env === 'development'? err?.stack : null
    })
};

export default globalErrorHandler;



// Error Pattern
/*
success
message
errorSources: {
path
message
}
stack
*/