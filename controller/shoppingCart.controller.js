import ShoppingModel from "../models/shpoingCart.model.js";
import UserModel from "../models/user.model.js";
import ProductModel from "../models/product.model.js";

export const addToShoppingCart = async (req, res) => {
  try {
    const { quantity, productId } = req.body;
    const userId = req.user._id;

    // Find the product by ID
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Create the shopping cart entry
    const shoppingCart = await ShoppingModel.create({
      name: product.name,
      price: product.price,
      quantity: quantity,
      productId: productId,
    });

    // Add shopping cart ID to the user's shopping cart if not already present
    await UserModel.findByIdAndUpdate(userId, {
      $addToSet: { shoppingCart: shoppingCart._id }, // Ensures no duplicates
    });

    res.status(200).json({ message: "Product added to shopping cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding product to shopping cart" });
  }
};

// get all shopping cart details
export const getAllCartsDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    // Fetch the user to get their shopping cart IDs
    const user = await UserModel.findById(userId).populate("shoppingCart");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the total count of shopping cart items
    const totalCount = await ShoppingModel.countDocuments({
      _id: { $in: user.shoppingCart },
    });

    // Fetch paginated shopping cart items
    const shoppingCartDetails = await ShoppingModel.find({
      _id: { $in: user.shoppingCart }, // Match user's shopping cart IDs
    })
      .populate("productId") // Populate product details
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json({
      shoppingCart: shoppingCartDetails,
      totalCount, // Total number of items
      totalPages: Math.ceil(totalCount / limit), // Total number of pages
      currentPage: parseInt(page), // Current page
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching shopping cart details" });
  }
};

// delete item from the shopping cart

export const deleteFromShoppingCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItemId = req.params.id;

    // Find the user
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item exists in the user's shopping cart
    if (!user.shoppingCart.includes(cartItemId)) {
      return res
        .status(400)
        .json({ message: "Item not found in shopping cart" });
    }

    // Remove the cart item from the ShoppingModel
    const deletedCartItem = await ShoppingModel.findByIdAndDelete(cartItemId);
    if (!deletedCartItem) {
      return res.status(404).json({ message: "Shopping cart item not found" });
    }

    // Remove the cart item ID from the user's shoppingCart array
    await UserModel.findByIdAndUpdate(userId, {
      $pull: { shoppingCart: cartItemId },
    });

    res
      .status(200)
      .json({ message: "Item removed from shopping cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing item from shopping cart" });
  }
};
