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
} from "../controllers/user.js";
import { isAdminRole, verifyAccessToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/users/register", register);
router.post("/users/login", login);
router.post("/users/logOut", logOut);

router.get("/users", [verifyAccessToken, isAdminRole], getUsers);
router.get("/users/id/:id", verifyAccessToken, getUser);
router.get("/users/currentUser", verifyAccessToken, getCurrentUser);

router.put("/users/updateClient", verifyAccessToken, updateUserByClient);
router.put(
  "/users/updateAdmin/:id",
  [verifyAccessToken, isAdminRole],
  updateUserByAdmin
);
router.put("/users/updateCart", [verifyAccessToken], updateCart);
router.delete("/users/:id", [verifyAccessToken, isAdminRole], deleteUser);

export default router;
