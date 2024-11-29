import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.createLoginValidationSchema),
  AuthController.loginUserIntoDB
);
router.post('/change-password')

export const AuthRoutes = router;