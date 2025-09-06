import express from 'express';
import { enrollInCourse } from '../controllers/enrollment.controller.js';

export default function enrollRoutes() {
    const enrollRouter = express.Router();
    enrollRouter.post("/create", enrollInCourse);
    return enrollRouter;
}