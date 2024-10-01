import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

import { getAllProducts, 
    getProductAccToCategory, 
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

router.route("/get-user-products").get(
    verifyJWT,
    getUserProducts
)

router.route("/get-all-products").get(
    getAllProducts
)

router.route("/get-category-products").post(
    getProductAccToCategory
)

export default router