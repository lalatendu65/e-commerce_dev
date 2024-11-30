import ProductModel from "../models/product.model.js";

// get all product for admin and user
export const getProduct = async (req, res) => {
  try {
    const { page, limit, priceRange, name } = req.query;
    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;

    // Build the query object
    let query = {};

    // If priceRange is provided, add it to the query
    if (priceRange) {
      query.price = { $lte: parseInt(priceRange, 10) }; // Filter products with price <= priceRange
    }

    // If product name is provided, add the search filter
    if (name) {
      query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    // Fetch the products with pagination and optional filters
    const products = await ProductModel.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);

    // Count total products for pagination
    const totalProducts = await ProductModel.countDocuments(query);

    res.status(200).json({
      message: "All products fetched successfully",
      data: products,
      count: totalProducts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching products",
      error: error.message,
    });
  }
};

// create a product

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    // Find the last product to generate a new productId
    const lastProduct = await ProductModel.findOne().sort({ productId: -1 });
    const lastNumber = lastProduct
      ? parseInt(lastProduct.productId.substring(2), 10)
      : 0;
    const newProductId = `PR${(lastNumber + 1).toString().padStart(4, "0")}`;

    // Create a new product instance
    const product = new ProductModel({
      name,
      price,
      description,
      category,
      stock,
      productId: newProductId,
    });

    // Save the product to the database
    await product.save();

    // Send a success response
    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    // Handle any errors during the product creation
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

// get a product by Id

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      message: "Product found",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error finding product",
      error: error.message,
    });
  }
};

// update product by Id
export const updateProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find and update the product by ID
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      req.body,
      { new: true, runValidators: true } // Ensure the updated data is validated
    );

    // If no product is found or updated, send an error response
    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found or error while updating the product",
      });
    }

    // Send a success response with the updated product
    res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// delete product by Id

export const deleteProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find and delete the product by ID
    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    // If no product is found or deleted, send an error response
    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Send a success response with the deleted product
    res.status(200).json({
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};
