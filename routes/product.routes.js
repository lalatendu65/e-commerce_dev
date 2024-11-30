import express from "express";

import {
  getProduct,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controller/product.controller.js";

import {
  verifyAdmin,
  verifyUpdate,
  verifyCreate,
} from "../middlewares/admin.validate.js";

import { isAuthenticate } from "../utils/token.js";

const router = express.Router();
router.get("/", isAuthenticate, getProduct);
router.post("/", isAuthenticate, verifyCreate, createProduct);
router.get("/:id", isAuthenticate, verifyAdmin, getProductById);
router.put("/:id", isAuthenticate, verifyUpdate, updateProductById);
router.delete("/:id", isAuthenticate, verifyAdmin, deleteProductById);
export default router;
