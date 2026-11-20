const jwt = require("jsonwebtoken");

// JWT Authentication Middleware
const protect = (req, res, next) => {
    try {
        // Get token from request headers
        const authHeader = req.headers.authorization;

        // Check whether token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Not authorized. Please log in."
            });
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Attach user information to request
        req.user = decoded;

        // Continue to the next middleware or controller
        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token. Please log in again."
        });
    }
};

module.exports = protect;
