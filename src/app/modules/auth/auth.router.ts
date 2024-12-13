import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import auth from '../../middlwares/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.createLoginValidationSchema),
  AuthController.loginUserIntoDB
);
router.post('/change-password', auth(userRole.admin, userRole.faculty, userRole.student), validateRequest(AuthValidation.changePasswordValidationSchema), AuthController.changePassword);

router.post('/refresh-token', validateRequest(AuthValidation.refreshTokenValidationSchema), AuthController.refreshToken);

router.post('/forget-password', validateRequest(AuthValidation.forgetPasswordValidationSchema), AuthController.forgetUserPassword);

export const AuthRoutes = router;
