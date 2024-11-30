import mongoose from "mongoose";

const options = {
  timestamps: true,
  versionKey: false,
};

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: String },
    role: {
      type: String,
      required: true,
    }, // Admin or Super admin
    contactNumber: { type: String },
    shoppingCart: [
      { type: mongoose.Schema.Types.ObjectId, ref: "shoppingCart" },
    ], // User's cart
  },
  options
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
