import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

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

    // Check if the token is valid
    jwt.verify(
      token,
      config.jwt_access_secret_token as string,
      function (err, decoded) {
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized person',
          );
        }

        const role = (decoded as JwtPayload).role;
        if(requiredRole && !requiredRole.includes(role)){
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are unauthorized person',
              );
        }

        req.user = decoded as JwtPayload;
        next();
      },
    );
  });
};

export default auth;