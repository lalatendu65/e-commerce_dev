import express from "express";

import {
  addToShoppingCart,
  getAllCartsDetails,
  deleteFromShoppingCart,
} from "../controller/shoppingCart.controller.js";

import { isAuthenticate } from "../utils/token.js";

const router = express.Router();

router.post("/", isAuthenticate, addToShoppingCart);
router.get("/", isAuthenticate, getAllCartsDetails);
router.delete("/:id", isAuthenticate, deleteFromShoppingCart);
export default router;
