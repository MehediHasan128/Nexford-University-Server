import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlwares/validationRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

// Create academic semester
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademiSemesterValdationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);

// Get all academic semesater
router.get('/academic-semester', AcademicSemesterController.getAllAcademicSemester);

export const AcademicSemesterRoutes = router;