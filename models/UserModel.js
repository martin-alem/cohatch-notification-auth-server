import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  dateJoined: {
    type: Date,
    required: false,
    default: new Date(),
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
