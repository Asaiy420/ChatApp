import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookie.jwt;
    // if no token send error message
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify is the token is valid

    // if not valid send error message
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select(-"password"); //deselect the password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {}
  console.log("Error in middleware", error.message);
  return res.status(500).json({ message: "Internal Server Error" });
};
