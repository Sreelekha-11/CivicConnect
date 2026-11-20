const express = require("express");

const { registerUser, createStaff, getAllUsers, loginUser, forgotPassword, resetPassword
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Citizen registration
router.post("/register", registerUser);

// Admin creates a staff account
router.post("/create-staff", protect, createStaff);

// Get all registered users (Admin only)
router.get("/users", protect, getAllUsers);

// Login for Citizen, Admin and Staff
router.post("/login", loginUser);

// Forgot password - send reset email
router.post("/forgot-password", forgotPassword);

// Reset password - verify token and update password
router.post("/reset-password", resetPassword);

module.exports = router;
