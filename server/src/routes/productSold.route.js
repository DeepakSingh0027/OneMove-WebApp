import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"

import { getBuyProduct, 
    getProductSold, 
    listProductSold} from "../controllers/productSold.controller.js"

const router = Router()

router.route("/get-sold-products").get(
    verifyJWT,
    getProductSold
)

router.route("/get-buy-products").get(
    verifyJWT,
    getBuyProduct
)

router.route("/list-sold-products").post(
    verifyJWT,
    listProductSold
)

export default router