import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../middlwares/validationRequest';
import { SemesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

// Create semester registration
router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

// Get all semester registration
router.get('/', SemesterRegistrationController.getAllSemesterRegistration);

// Get single semester registration
router.get(
  '/:semesterRegistrationId',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

export const SemesterRegistrationRoutes = router;
