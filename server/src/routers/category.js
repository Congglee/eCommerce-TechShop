import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../controllers/category.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);

router.post("/categories", [verifyAccessToken, isAdminRole], createCategory);
router.put("/categories/:id", [verifyAccessToken, isAdminRole], updateCategory);

router.delete(
  "/categories/:id",
  [verifyAccessToken, isAdminRole],
  deleteCategory
);

export default router;
