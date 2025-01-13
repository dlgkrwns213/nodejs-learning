import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// 스키마 -> 모델
// mongoose.model(모델명, 스키마명)
const User = mongoose.model("User", userSchema);

export default User;