import mongoose from "mongoose";

const options = {
  timestamps: true,
  versionKey: false,
};

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  options
);
const ProductModel = mongoose.model("Product", productSchema);
export default ProductModel;
