import express from "express";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductById,
  getProductBySlug,
  uploadImagesProducts,
} from "../controllers/product.js";
import uploadCloud from "../config/cloudinary.config.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getProducts);
router.get("/products/id/:id", getProductById);
router.get("/products/slug/:slug", getProductBySlug);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.put(
  "products/uploadimage/:id",
  [verifyAccessToken, isAdminRole],
  uploadCloud.array("images", 10),
  uploadImagesProducts
);

export default router;
