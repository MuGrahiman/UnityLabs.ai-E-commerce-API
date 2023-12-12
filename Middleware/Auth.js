import Jwt from "jsonwebtoken";
import User from "../Model/User-Model";
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token)
      return res.status(401).json({ message: "Authentication failed" });

    const decodedToken = Jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.userId = decodedToken.id;
    req.userType = user.type;
    next();
  } catch (error) {
    res.status(400).json("Invalid Creadentials");
  }
};
export default auth;
