import express from 'express';
import { AdminController } from './admin.controller';

const router = express.Router();

// Get all student
router.get('/', AdminController.getAllAdmin);

export const AdminRoutes = router;