import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    //* User schema here
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    fullName: {
      type: String,
      requried: true,
    },
    password: {
      type: String,
      required: ["Password is required to continue", true],
      minLength: 8,
    },
    profilePic: {
      type: String, //prob will use cloudinary url
      default: "",
    },
  },
  { timestamps: true }
);

const Uaer = mongoose.model("User", userSchema);


export default User;