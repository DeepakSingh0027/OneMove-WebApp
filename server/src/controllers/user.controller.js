import { asyncHandler } from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const registerUser =  asyncHandler(async (req,res)=>{
    //get user detail from frontend
    //validation - notempty
    //check if user already exists
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

    const {fullname, email, username, password, role} = req.body

    if(
        [fullname, email, username, password].some((field)=>(
            field?.trim() === ""    
        ))
    ){
        throw new ApiError(400, "All Fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User With email or usename exists")
    }

    const user = await User.create({
        fullname,
        email,
        password,
        username: username.toLowerCase(),
        role

    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went Wrong on register")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully")
    )

})


export {registerUser}