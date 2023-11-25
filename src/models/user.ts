import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password_hash: String,
  dob: String,
  gender: String,
});

const User = mongoose.model("User", userSchema);

export { User };
