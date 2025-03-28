const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
  );
};

const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, role } = req.body;

  try {
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

   
    user = new User({
      name,
      email,
      password,
      role
    });

    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    
    await user.save();

    
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    
    const payload = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const getUserProfile = async (req, res) => {
  try {
      const user = await User.findById(req.user.id).select("-password"); // Exclude password
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(user);
  } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Server error" });
  }
};


module.exports = { register, login, getUserProfile };
