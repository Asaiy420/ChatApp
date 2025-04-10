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
      required: true,
      minLength: 8,
    },
    profilePic: {
      type: String, //prob will use cloudinary url
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);


export default User;