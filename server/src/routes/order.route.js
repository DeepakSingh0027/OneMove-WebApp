import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  getOrder,
  getOrderSold,
  listOrder,
  shippmentUpdate,
} from "../controllers/order.controller.js";

const router = Router();
//both
router.route("/get-order").get(verifyJWT, getOrder);
//seller
router.route("/get-order-sold").get(verifyJWT, getOrderSold);
//buyer
router.route("/list-order").post(verifyJWT, listOrder);

router.route("/updateShippment").patch(shippmentUpdate);

export default router;
