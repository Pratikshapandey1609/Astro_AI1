import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ message: "Authentication required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password"); // Exclude password
    if (!req.user) return res.status(404).json({ message: "User not found" });

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
