import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Check the token is sent from the client
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized person',
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret_token as string,
    ) as JwtPayload;

    const { userId, role } = decoded;

    // Check the user is exists on database
    const isUserExists = await User.findOne({id: userId}).select('+password');
    if(!isUserExists){
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found!')
    }

    // Check the user is already deleted
    const isDeletedUser = isUserExists?.isDeleted;
    if(isDeletedUser === true){
        throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
    }

    // Check the user is active or blocked
    const userStatus = isUserExists?.status;
    if(userStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are unauthorized person',
      );
    }

    req.user = decoded;
    next();
  });
};

export default auth;
