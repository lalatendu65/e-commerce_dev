import mongoose from "mongoose";

const options = {
  timestamps: true,
  versionKey: false,
};

const shoppingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  options
);

const ShoppingModel = mongoose.model("shoppingCart", shoppingSchema);
export default ShoppingModel;
