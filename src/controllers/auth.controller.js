import { verifyEmail } from '../util/verify-email.js';
import { db } from '../../index.js';
import bcrypt from 'bcrypt';
import { generateAccessToken, generateRefreshToken } from '../jwt/jwt-service.js';

export async function registerUser(req, res) { 
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (!verifyEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (role !== 'student' && role !== 'admin') {
        return res.status(400).json({ message: "Role must be either 'student' or 'admin'" });
    }
    try {
        const existingUser = await db('users').where({ email }).first();
        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db('users').insert({ name, email, password: hashedPassword, role });
        return res.status(201).json({ message: "User registered successfully" });
        
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function loginUser(req, res) { 
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    if (!verifyEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    try {
        const user = await db('users').where({ email }).first();
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const accessToken = generateAccessToken({
            id: user.id, email: user.email, role: user.role
        });
        const refreshToken = generateRefreshToken({
            id: user.id, email: user.email, role: user.role
        })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.status(200).json({ message: "Login successful", accessToken });
    } catch (error) {
        console.error("Error logging in user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}