import RateLimit from "express-rate-limit";
import { Router } from "express";
import {
  changeCurrentPassword,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  updateRole,
} from "../controllers/user.controller.js";
import { getUserProducts } from "../controllers/product.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Rate limiter: maximum of 10 requests per minute for updateRole route
const updateRoleRateLimiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // max 10 requests per windowMs
});

router.route("/register").post(registerUser);

router.route("/get-user-products").get(verifyJWT, getUserProducts);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-access-token").post(refreshAccessToken);

router.route("/change-password").patch(verifyJWT, changeCurrentPassword);

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/update-details").patch(verifyJWT, updateAccountDetails);

router.route("/update-role").patch(updateRoleRateLimiter, verifyJWT, updateRole);

export default router;
