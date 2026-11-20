const User = require("../models/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Configure email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Password validation
const strongPassword =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/;


// Register a new citizen
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email and password."
            });
        }

        if (!strongPassword.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, uppercase, lowercase, number and special character."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        const newUser = new User({
            name: name.trim(),
            email: normalizedEmail,
            password
        });

        await newUser.save();

        res.status(201).json({
            message: "Registration successful!",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        console.error("Registration Error:", error);

        res.status(500).json({
            message: "Server error during registration."
        });
    }
};


// Create a new staff account (Admin only)
const createStaff = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin permission required."
            });
        }

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please provide name, email and password."
            });
        }

        if (!strongPassword.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, uppercase, lowercase, number and special character."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        const newStaff = new User({
            name: name.trim(),
            email: normalizedEmail,
            password,
            role: "staff"
        });

        await newStaff.save();

        res.status(201).json({
            message: "Staff account created successfully!",
            staff: {
                id: newStaff._id,
                name: newStaff.name,
                email: newStaff.email,
                role: newStaff.role
            }
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "An account with this email already exists."
            });
        }

        console.error("Create Staff Error:", error);

        res.status(500).json({
            message: "Server error while creating staff account."
        });
    }
};


// Get all registered users (Admin only)
const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({
                message: "Access denied. Admin permission required."
            });
        }

        const users = await User.find()
            .select("name email role createdAt")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Users retrieved successfully!",
            count: users.length,
            users: users.map((user) => ({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt
            }))
        });

    } catch (error) {
        console.error("Get All Users Error:", error);

        res.status(500).json({
            message: "Server error while retrieving users."
        });
    }
};


// Login an existing user (Citizen, Admin or Staff)
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(404).json({
                message: "Account not found. Please register first."
            });
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Incorrect password. Please try again."
            });
        }

        const token = jwt.sign(
            {
                id: user._id.toString(),
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            message: "Server error during login."
        });
    }
};


// Forgot Password
const forgotPassword = async (req, res) => {
    let user;

    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Please provide your email address."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        user = await User.findOne({
            email: normalizedEmail
        });

        // Do not reveal whether an account exists
        if (!user) {
            return res.status(200).json({
                message: "If an account exists with this email, a password reset link will be sent."
            });
        }

        // Generate a secure random token
        const resetToken = crypto.randomBytes(32).toString("hex");

        // Store only the hashed token in the database
        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

        await user.save();

        // Create reset link
        const resetUrl =
            `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

        // Send reset email
        await transporter.sendMail({
            from: `"CivicConnect" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "CivicConnect - Password Reset",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2>Password Reset Request</h2>

                    <p>Hello ${user.name},</p>

                    <p>
                        We received a request to reset your
                        CivicConnect account password.
                    </p>

                    <p>
                        Click the button below to reset your password.
                        This link expires in 15 minutes.
                    </p>

                    <a href="${resetUrl}"
                       style="
                           display: inline-block;
                           padding: 12px 20px;
                           background-color: #2563eb;
                           color: white;
                           text-decoration: none;
                           border-radius: 6px;
                       ">
                        Reset Password
                    </a>

                    <p>
                        If you did not request this, you can ignore
                        this email.
                    </p>

                    <p>Regards,<br>CivicConnect Team</p>
                </div>
            `
        });

        return res.status(200).json({
            message: "If an account exists with this email, a password reset link will be sent."
        });

    } catch (error) {
        // Clear the token if email delivery fails
        if (user) {
            try {
                user.resetPasswordToken = null;
                user.resetPasswordExpires = null;
                await user.save();
            } catch (cleanupError) {
                console.error("Reset Token Cleanup Error:", cleanupError);
            }
        }

        console.error("Forgot Password Error:", error);

        return res.status(500).json({
            message: "Unable to send password reset email. Please try again later."
        });
    }
};


// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                message: "Please provide the reset token and new password."
            });
        }

        if (!strongPassword.test(password)) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters, uppercase, lowercase, number and special character."
            });
        }

        // Hash the received token
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // Find user with a valid, unexpired token
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                message: "Password reset link is invalid or has expired."
            });
        }

        // Update password (User model hashes it automatically)
        user.password = password;

        // Clear reset token fields
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;

        await user.save();

        return res.status(200).json({
            message: "Password reset successful! Please login with your new password."
        });

    } catch (error) {
        console.error("Reset Password Error:", error);

        return res.status(500).json({
            message: "Server error while resetting password."
        });
    }
};


// Export controller functions
module.exports = {
    registerUser, createStaff, getAllUsers, loginUser, forgotPassword, resetPassword
};
