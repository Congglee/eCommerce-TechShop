import express from "express";
import {
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  getProductById,
  getProductBySlug,
  uploadImagesProducts,
  ratings,
} from "../controllers/product.js";
import uploadCloud from "../config/cloudinary.config.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post(
  "/products",
  [verifyAccessToken, isAdminRole],
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  createProduct
);

router.get("/products", getProducts);
router.get("/products/id/:id", getProductById);
router.get("/products/slug/:slug", getProductBySlug);

router.put(
  "/products/update/:id",
  [verifyAccessToken, isAdminRole],
  updateProduct
);
router.put("/products/ratings", verifyAccessToken, ratings);

router.put(
  "products/uploadimage/:id",
  [verifyAccessToken, isAdminRole],
  uploadCloud.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 },
  ]),
  uploadImagesProducts
);

router.delete("/products/:id", [verifyAccessToken, isAdminRole], deleteProduct);

export default router;
