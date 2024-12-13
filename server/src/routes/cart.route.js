import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  addToCart,
  getCartDetails,
  removeFromCart,
} from "../controllers/cart.controller.js";

const router = Router();

router.route("/list-cart").post(verifyJWT, addToCart);

router.route("/get-cart").get(verifyJWT, getCartDetails);

router.route("/remove-item-cart/:id").patch(verifyJWT, removeFromCart);

export default router;
