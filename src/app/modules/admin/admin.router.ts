import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

// Get all student
router.get('/', AdminController.getAllAdmin);
router.get('/:adminId', AdminController.getAdminById);

export const AdminRoutes = router;