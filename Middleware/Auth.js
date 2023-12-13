import Jwt from "jsonwebtoken";
import User from "../Models/User-Model.js";
const auth = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res
        .status(401)
        .json({ message: "Invalid Authorization Creadentials" });
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token required" });

    const decodedToken = verifyToken(token);
    if (!decodedToken)
      return res.status(401).json({ message: "Invalid Token" });
 
    const user = await User.findById(decodedToken.userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.userId = decodedToken.userId;
    req.userType = user.type;
    next();
  } catch (error) {
    console.log(error)
    res.status(400).json("Invalid Creadentials");
  }
};
export default auth;

export const generateToken = (userId) =>
  Jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (token) => Jwt.verify(token, process.env.JWT_SECRET);
