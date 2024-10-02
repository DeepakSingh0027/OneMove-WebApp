import {Router} from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { addToCart, getCartDetails } from "../controllers/cart.controller.js"




const router = Router()

router.route("/list-cart").post(
    verifyJWT,
    addToCart
)

router.route("/get-cart").get(
    verifyJWT,
    getCartDetails
)





export default router