import express from 'express';
import validateRequest from '../../middlwares/validationRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentController } from './academicDepartment.controller';

const router = express.Router();


router.post('/create-academic-department', validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentController.createAcademicDepartment)


export const AcademicDepartmentRoutes = router