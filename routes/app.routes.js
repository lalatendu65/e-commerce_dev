import { Router } from "express";
import authRoute from "./auth.routes.js";
import productRoute from "./product.routes.js";
import ShoppingCartRoute from "./shoppingCart.routes.js";
const route = Router();

// Setup your routes here
route.use("/api/v1/auth", authRoute);
route.use("/api/v1/products", productRoute);
route.use("/api/v1/cart", ShoppingCartRoute);
export default route;
