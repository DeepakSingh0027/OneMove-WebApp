import {   Router } from "express"
import { changeCurrentPassword, 
    getCurrentUser, 
    loginUser,
    logoutUser,
    refreshAccessToken,
    registerUser, 
    updateAccountDetails,
    updateRole
    } from "../controllers/user.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"


const router = Router()
router.route("/register").post(
    registerUser
)

// secure 

router.route("/login").post(
    loginUser
)

router.route("/logout").post(
    verifyJWT,
    logoutUser
)

router.route("/refresh-access-token").post(
    refreshAccessToken
)

router.route("/change-password").patch(
    verifyJWT,
    changeCurrentPassword
)

router.route("/current-user").get(
    verifyJWT,
    getCurrentUser
)

router.route("/update-details").patch(
    verifyJWT,
    updateAccountDetails
)

router.route("/update-role").patch(
    verifyJWT,
    updateRole
)


export default router