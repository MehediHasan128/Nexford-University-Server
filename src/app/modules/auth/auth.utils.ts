import jwt from 'jsonwebtoken';
import { TUserToken } from './auth.interface';

export const createAccessOrRefreshToken = (payload: TUserToken, secreatKey: string, exp: string) => {
    return jwt.sign(payload, secreatKey, {expiresIn: exp});
}