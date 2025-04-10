import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      res
        .status(400)
        .json({ message: "Password must contatin minimum of 8 characters" });
    }
    const user = await User.findOne({ email });
    //! if user already exists send error message
    if (user) return res.status(400).json({ message: "Email already exists" });

    //! if not then hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      //generate the jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error when signing in", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const {email, password} = req.body
  const user = User.findOne({email})
  
    if (user){
        
  }
};

export const logout = (req, res) => {
  res.send("signup route page");
};
