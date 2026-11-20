require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const User = require("./models/User");

const createAdmin = async () => {
    try {
        // Check whether Admin details exist in .env
        if (
            !process.env.ADMIN_NAME ||
            !process.env.ADMIN_EMAIL ||
            !process.env.ADMIN_PASSWORD
        ) {
            throw new Error("Admin details are missing in .env");
        }

        // Connect to MongoDB
        await connectDB();

        // Check whether Admin already exists
        const existingAdmin = await User.findOne({
            email: process.env.ADMIN_EMAIL
        });

        if (existingAdmin) {
            console.log("Admin account already exists!");
            return;
        }

        // Create Admin account
        const admin = await User.create({
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
            role: "admin"
        });

        console.log("Admin account created successfully!");
        console.log("Admin Email:", admin.email);
        console.log("Admin Role:", admin.role);

    } catch (error) {
        console.error("Admin Creation Error:", error.message);

    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
