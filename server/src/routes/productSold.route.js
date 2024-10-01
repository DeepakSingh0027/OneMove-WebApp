import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"

import { getProductSold } from "../controllers/productSold.controller.js"

const router = Router()

router.route("/get-sold-products").get(
    verifyJWT,
    getProductSold
)

export default router