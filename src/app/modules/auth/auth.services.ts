import AppError from "../../errors/AppError";
import { User } from "../user/user.model"
import { TChangePassword, TUserLogin } from "./auth.interface"
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../../config";
import { createAccessOrRefreshToken } from "./auth.utils";
// import { sendEmail } from "../../utils/sendEmail";

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

 
    
    const accessToken = createAccessOrRefreshToken(jwtPayload, config.jwt_access_secret_token as string, config.jwt_access_expires_in as string);
    const refreshToken = createAccessOrRefreshToken(jwtPayload, config.jwt_refresh_secret_token as string, config.jwt_refresh_expires_in as string);
    
    return {
        accessToken,
        refreshToken,
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

    const data = await User.findOneAndUpdate({
        id: userData?.userId,
        role: userData?.role
    }, {password: newPassword, needsPasswordChange: false, passwordChangeAt: new Date()}, {new: true});
    return data
}

const refreshToken = async(token: string) => {
  
      const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret_token as string,
      ) as JwtPayload;
  
      const { userId, role } = decoded;

      const jwtPayload = {
        userId,
        role
    }
  
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

      const accessToken = createAccessOrRefreshToken(jwtPayload, config.jwt_access_secret_token as string, config.jwt_access_expires_in as string);

      return {
        accessToken
      }
}

const forgetPassword = async(userId: string) => {

    // Check the user is exists in database
    const user = await User.findOne({id: userId});
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found!')
    }

    // Check the user is already delete or not
    const isUserDelete = user?.isDeleted;
    if(isUserDelete === true){
        throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
    }

    // Check the user is block or active
    const userStatus = user?.status;
    if(userStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
    }

    const jwtPayload = {
        userId: user?.id,
        role: user?.role
    }

 
    
    const resetToken = createAccessOrRefreshToken(jwtPayload, config.jwt_access_secret_token as string, '10m');

    const passwordResetLink = `${config.reset_password_ui_link}?id=${user?.id}&token=${resetToken}`;

    // sendEmail(user?.email, passwordResetLink);

    return {
        passwordResetLink
    };
}

const resetPassword = async(payload: {id: string, newPassword: string}, token: string) => {
    // Check the user is exists in database
    const user = await User.findOne({id: payload.id});
    console.log(user);
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND, 'This user not found!')
    }

    // Check the user is already delete or not
    const isUserDelete = user?.isDeleted;
    if(isUserDelete === true){
        throw new AppError(httpStatus.FORBIDDEN, 'This user is already deleted!')
    }

    // Check the user is block or active
    const userStatus = user?.status;
    if(userStatus === 'blocked'){
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked!')
    }

    const decoded = jwt.verify(
        token,
        config.jwt_access_secret_token as string,
      ) as JwtPayload;

      if(decoded.userId !== payload.id){
        throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden')
      }

    const resetPassword = await bcrypt.hash(payload?.newPassword, Number(config.bcrypt_salt_round));


    await User.findOneAndUpdate({id: payload?.id}, {password: resetPassword}, {new: true});
}

export const AuthServices = {
    loginUser,
    changeUserPassword,
    refreshToken,
    forgetPassword,
    resetPassword
}