import express from "express";
import {
  createNewBrand,
  deleteBrand,
  getBrands,
  updateBrand,
} from "../controllers/brand.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/brands", getBrands);
router.post("/brands", [verifyAccessToken, isAdminRole], createNewBrand);
router.put("/brands/:id", [verifyAccessToken, isAdminRole], updateBrand);
router.delete("/brands/:id", [verifyAccessToken, isAdminRole], deleteBrand);

export default router;
