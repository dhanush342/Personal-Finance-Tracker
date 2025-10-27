import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req,res) => {
  const { name,email,password } = req.body;
  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    // Check password strength
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(400).json({ message: "Email already in use" });
    }
    
    const user = await User.create({ name, email: email.toLowerCase(), password });
    res.status(201).json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      token: generateToken(user._id) 
    });
  } catch(err){ 
    console.error('Registration error:', err);
    res.status(500).json({ message: err.message || 'Registration failed' }); 
  }
}

export const loginUser = async (req,res) => {
  const { email,password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    const user = await User.findOne({ email: email.toLowerCase() });
    if(!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    res.json({ 
      _id: user._id, 
      name: user.name, 
      email: user.email, 
      token: generateToken(user._id) 
    });
  } catch(err){ 
    console.error('Login error:', err);
    res.status(500).json({ message: err.message || 'Login failed' }); 
  }
}

export const getUserProfile = async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if(!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch(err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({ message: err.message || 'Failed to fetch profile' });
  }
}
