import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.router";

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/academicSemester',
        route: AcademicSemesterRoutes
    }
]

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;