import express from 'express';
import { createCourse } from '../controllers/course.controller.js';
import { getAllCourses } from '../controllers/course.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';

export default function courseRoutes() {
    const courseRouter = express.Router();
    courseRouter.post("/create", authMiddleware, createCourse);
    courseRouter.get("/all", getAllCourses);
    return courseRouter;
}