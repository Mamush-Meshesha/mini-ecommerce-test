import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.utils.js";
import { prisma } from "../utils/prisma.utils.js";
import { uploadToCloudinary } from "../middlewares/cloudinary.js";
import jwt from 'jsonwebtoken';
import { Role } from "@prisma/client";
export const register = async (req, res) => {
    try {
        const { name, email, password, role = Role.USER } = req.body;
        // Validate input
        if (!name || !email || !password) {
            return res
                .status(400)
                .json({ message: "Name, email, and password are required" });
        }
        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "User with this email already exists" });
        }
        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        // Create user
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash,
                role: role,
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        // Generate token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        res.status(201).json({
            message: "User registered successfully",
            user,
            token,
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role,
        });
        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
            token,
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ user });
    }
    catch (error) {
        console.error("Get profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const { name, email } = req.body;
        const file = req.file;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        // Validate input
        if (!name && !email && !file) {
            return res.status(400).json({
                message: "At least one field (name, email, or profile image) is required",
            });
        }
        let profileImageUrl = "";
        let profileImagePublicId = "";
        // Handle profile image upload if file is provided
        if (file) {
            try {
                const uploadResult = await uploadToCloudinary(file, "mini-ecommerce/profiles");
                profileImageUrl = uploadResult.secure_url;
                profileImagePublicId = uploadResult.public_id;
                // File cleanup handled by multer
            }
            catch (uploadError) {
                console.error("Profile image upload error:", uploadError);
                return res
                    .status(500)
                    .json({ message: "Failed to upload profile image" });
            }
        }
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                ...(name && { name }),
                ...(email && { email }),
                ...(file && {
                    profileImage: profileImageUrl,
                    profileImagePublicId: profileImagePublicId,
                }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                profileImage: true,
                profileImagePublicId: true,
                updatedAt: true,
            },
        });
        res.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
//# sourceMappingURL=auth.controller.js.map