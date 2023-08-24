import express from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  getUserOrder,
  updateStatusByAdmin,
  updateStatusByClient,
} from "../controllers/order.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/orders", [verifyAccessToken], createOrder);
router.put(
  "/orders/admin/status/:id",
  [verifyAccessToken, isAdminRole],
  updateStatusByAdmin
);
router.put(
  "/orders/user/status/:id",
  [verifyAccessToken],
  updateStatusByClient
);

router.get("/orders/user", [verifyAccessToken], getUserOrder);
router.get("/orders/user/:id", [verifyAccessToken], getOrder);
router.get("/orders/admin", [verifyAccessToken, isAdminRole], getOrders);

export default router;
