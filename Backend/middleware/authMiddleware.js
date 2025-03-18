const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
            
            req.user = await User.findById(decoded.id).select("-password"); // Exclude password
            
            if (!req.user) {
                return res.status(401).json({ error: "User not found" });
            }

            next(); // Proceed to the next middleware/controller
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            return res.status(401).json({ error: "Invalid or expired token" });
        }
    } else {
        return res.status(401).json({ error: "No token, authorization denied" });
    }
};

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        const token = authHeader.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password"); // Exclude password

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

module.exports = { protect, authMiddleware };
