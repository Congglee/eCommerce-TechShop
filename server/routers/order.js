import express from "express";
import {
  createOrder,
  getOrders,
  getUserOrder,
  updateStatus,
} from "../controllers/order.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/orders", [verifyAccessToken], createOrder);
router.put(
  "/orders/status/:id",
  [verifyAccessToken, isAdminRole],
  updateStatus
);

router.get("/orders", [verifyAccessToken], getUserOrder);
router.get("/orders/admin", [verifyAccessToken, isAdminRole], getOrders);

export default router;
