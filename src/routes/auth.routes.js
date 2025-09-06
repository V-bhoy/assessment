import express from 'express';
import { registerUser } from '../controllers/auth.controller.js';
import { loginUser } from '../controllers/auth.controller.js';

export default function authRoutes() {
    const authRouter = express.Router();
    authRouter.post("/register", registerUser);
    authRouter.post('/login', loginUser);
    return authRouter;
}