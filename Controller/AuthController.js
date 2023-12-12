import jwt from "jsonwebtoken";
import User from "../models/User"; 
import { BcryptPassword, ComparePassword } from "../Middleware/Bcrypt";

const generateToken = (userId) => {
  return jwt.sign({ userId }, "your-secret-key", { expiresIn: "1h" });
};

export const register = async (req, res) => {
  const { username, password, type } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    const hashedPassword = await BcryptPassword(password);

    const newUser = new User({
      username,
      password: hashedPassword,
      type,
    });

    const savedUser = await newUser.save();

    const token = generateToken(savedUser._id);
    res.status(201).json({ userId: savedUser._id, token });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server issue" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user||!password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await ComparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id);
    res.status(200).json({ userId: user._id, token });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server issue" });
  }
};


export const getListOfSellers = async (req, res) => {
  try {
    const sellers = await User.find({ type: 'seller' });

    const sellerList = sellers.map((seller) => ({
      username: seller.username,
      userId: seller._id,
    }));

    res.status(200).json(sellerList);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Server issue' });
  }
};
