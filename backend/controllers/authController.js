import User from "../models/User.js";
import jwt from "jsonwebtoken";

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

export const registerUser = async (req,res) => {
  const { name,email,password } = req.body;
  try {
    if(await User.findOne({ email })) return res.status(400).json({ message:"User exists" });
    const user = await User.create({ name,email,password });
    res.status(201).json({ _id:user._id, name:user.name, email:user.email, token:generateToken(user._id) });
  } catch(err){ res.status(500).json({ message: err.message }); }
}

export const loginUser = async (req,res) => {
  const { email,password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user || !(await user.matchPassword(password))) return res.status(401).json({ message:"Invalid credentials" });
    res.json({ _id:user._id, name:user.name, email:user.email, token:generateToken(user._id) });
  } catch(err){ res.status(500).json({ message: err.message }); }
}

export const getUserProfile = async (req,res) => {
  const user = await User.findById(req.user.id).select("-password");
  if(!user) return res.status(404).json({ message:"User not found" });
  res.json(user);
}
