import express from 'express';
import authRoutes from './auth.routes.js';

export default function createAppRouter() {
    const router = express.Router();
    router.use('/auth', authRoutes());
    return router; 
}