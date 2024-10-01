import { asyncHandler } from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { Category } from "../models/category.model.js"
import {ProductSold} from "../models/productSold.model.js"
import {Product} from "../models/product.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

//create product sold table

const getProductSold = asyncHandler(async(req,res)=>{
    const user = req.user;

    const soldItems = await ProductSold.find({ owner: user._id });

    return res.status(200)
    .json(new ApiResponse(200,soldItems,"ProductSold Fetched"))
})

export {getProductSold

}