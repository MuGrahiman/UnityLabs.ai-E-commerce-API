import jwt from "jsonwebtoken";
import User from "../Models/User-Model.js";
import { BcryptPassword, ComparePassword } from "../Middleware/Bcrypt.js";
import { generateToken } from "../Middleware/Auth.js";

export const register = async (req, res) => {
  const { username, password, type } = req.body;
  if (!username || !password || !["buyer", "seller"].includes(type))
    return res.status(400).json({ message: "Invalid user details" });

  try {
    const existingUser = await User.findOne({
      username: username.toLowerCase(),
      type,
    });
    if (existingUser)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await BcryptPassword(password);

    const newUser = new User({
      username: username.toLowerCase(),
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
  const { username, password, type } = req.body;

  try {
    if (!username || !password || !type)
      return res.status(400).json({ message: "Invalid credentials" });

    const user = await User.findOne({ username: username.toLowerCase(), type });
    if (!user) return res.status(400).json({ message: "User Couldnt find" });

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
    const sellers = await User.find({ type: "seller" });

    const sellerList = sellers.map((seller) => ({
      username: seller.username,
      userId: seller._id,
    }));

    res.status(200).json(sellerList);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server issue" });
  }
};
