import express from 'express';
import { SemesterRegistrationController } from './semesterRegistration.controller';

const router = express.Router();

// Create semester registration
router.post('/create-semester-registration', SemesterRegistrationController.createSemesterRegistration);


export const SemesterRegistrationRoutes = router;
