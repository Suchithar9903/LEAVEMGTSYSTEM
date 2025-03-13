const jwt = require("jsonwebtoken");
const User = require("../models/User"); 
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]; // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
            req.user = await User.findOne({ email: decoded.email }).select("-password"); // Fetch user
            if (!req.user) throw new Error("User not found");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "No token, not authorized" });
    }
});

module.exports = { protect };
