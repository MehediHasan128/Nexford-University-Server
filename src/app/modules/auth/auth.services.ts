import AppError from "../../errors/AppError";
import { User } from "../user/user.model"
import { TChangePassword, TUserLogin } from "./auth.interface"
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";

const loginUser = async(payload: TUserLogin) => {
    // Check the user is exists on database
    const isUserExists = await User.findOne({id: payload?.id}).select('+password');
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

    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(payload?.password, isUserExists?.password);
    if(!isPasswordMatch){
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!')
    }

    // Create token and send to the client
    const jwtPayload = {
        userId: isUserExists?.id,
        role: isUserExists?.role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret_token as string, {expiresIn: '30d'});
    
    return {
        accessToken,
        needsPasswordChange: isUserExists.needsPasswordChange
    }
}

const changeUserPassword = async(userData: JwtPayload, payload: TChangePassword) => {

    // Checking if ther user is exist on database
    const user = await User.findOne({id: userData?.userId}).select('+password');
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found!')
    }
    const userOldPassword = user?.password;
    
    // Check the old password is correct or not
    const isOldPasswordCorrect = await bcrypt.compare(payload?.oldPassword, userOldPassword);
    if(!isOldPasswordCorrect){
        throw new AppError(httpStatus.BAD_REQUEST, 'The old password you entered is incorrect. Please try again.')
    }

    const newPassword = await bcrypt.hash(payload?.newPassword, Number(config.bcrypt_salt_round));
    console.log('new pass', newPassword);

    const data = await User.findOneAndUpdate({
        id: userData?.userId,
        role: userData?.role
    }, {password: newPassword}, {new: true});
    return data
}

export const AuthServices = {
    loginUser,
    changeUserPassword
}