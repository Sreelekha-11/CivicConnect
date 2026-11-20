const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const complaintRoutes = require("./routes/complaintRoutes");
const protect = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "5mb" }));

// Authentication routes
app.use("/api/auth", authRoutes);

// Complaint routes
app.use("/api/complaints", complaintRoutes);

// Test API
app.get("/", (req, res) => {
    res.send("CivicConnect Backend is running!");
});

// Protected test API
app.get("/api/protected", protect, (req, res) => {
    res.status(200).json({
        message: "You are authorized to access this route!",
        user: req.user
    });
});

// Server configuration
const PORT = process.env.PORT || 5000;

// Start server after database connection
const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
    }
};

startServer();
