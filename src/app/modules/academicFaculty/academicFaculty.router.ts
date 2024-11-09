import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlwares/validationRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post('/create-academic-faculty', validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty);

export const AcademicFacultyRouter = router;