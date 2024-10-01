import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

import { getProductSold, 
    getUserProducts, 
    listProduct } from "../controllers/product.controller.js"

const router = Router()

router.route("/list-product").post(
    verifyJWT,
    upload.fields([
        {
            name: "image",
            maxCount: 1
        }
    ]),
    listProduct
)

router.route("/get-user-product").get(
    getUserProducts
)

router.route("/get-sold-product").get(
    getProductSold
)

export default router