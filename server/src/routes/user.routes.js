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

const router = Router()
router.route("/register").post(
    registerUser
)

// secure 

router.route("/login").post(
    loginUser
)

router.route("/logout").post(
    logoutUser
)

router.route("/refresh-access-token").post(
    refreshAccessToken
)

router.route("/change-password").patch(
    changeCurrentPassword
)

router.route("/current-user").get(
    getCurrentUser
)

router.route("/update-details").patch(
    updateAccountDetails
)

router.route("/update-role").patch(
    updateRole
)


export default router