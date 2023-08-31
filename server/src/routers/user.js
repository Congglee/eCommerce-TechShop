import express from "express";
import {
  register,
  login,
  logOut,
  getUsers,
  getUser,
  deleteUser,
  updateCart,
  updateUserByClient,
  updateUserByAdmin,
  getCurrentUser,
  removeProductInCart,
  updateCarts,
  updateUserOrder,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  finalRegister,
} from "../controllers/user.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";
import uploadCloud from "../config/cloudinary.config.js";

const router = express.Router();

router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/refreshToken", refreshAccessToken);
router.post("/users/forgotPassword", forgotPassword);

router.get("/users", [verifyAccessToken, isAdminRole], getUsers);
router.get("/users/id/:id", verifyAccessToken, getUser);
router.get("/users/currentUser", verifyAccessToken, getCurrentUser);
router.get("/users/logOut", logOut);

router.put("/users/finalRegister/:token", finalRegister);
router.put(
  "/users/updateClient",
  verifyAccessToken,
  uploadCloud.single("avatar"),
  updateUserByClient
);
router.put("/users/resetPassword", resetPassword);
router.put("/users/updateUserOrder", verifyAccessToken, updateUserOrder);
router.put(
  "/users/updateAdmin/:id",
  [verifyAccessToken, isAdminRole],
  updateUserByAdmin
);
router.put("/users/updateCart", [verifyAccessToken], updateCart);
router.put("/users/updateCarts", [verifyAccessToken], updateCarts);

router.delete(
  "/users/removeCart/:id",
  [verifyAccessToken],
  removeProductInCart
);
router.delete("/users/:id", [verifyAccessToken, isAdminRole], deleteUser);

export default router;
