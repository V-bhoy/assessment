import express from 'express';
import authRoutes from './auth.routes.js';
import authMiddleware from '../middleware/authMiddleware.js';
import courseRoutes from './course.routes.js';
import enrollRoutes from './enroll.routes.js';

export default function createAppRouter() {
    const router = express.Router();
    router.use('/auth', authRoutes());
    router.use("/course", courseRoutes());
    router.use("/enroll", authMiddleware, enrollRoutes());
    return router; 
}