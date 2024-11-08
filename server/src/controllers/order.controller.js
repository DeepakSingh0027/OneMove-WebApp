import { asyncHandler } from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import { Category } from "../models/category.model.js"
import {Order} from "../models/order.model.js"
import {Product} from "../models/product.model.js"
import {uploadOnCloudinary} from "../utils/Cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Order } from "../models/order.model.js"

//buyer
const listOrder = asyncHandler(async (req, res, next) => {
    const { productID, quantity, address } = req.body;

    // Validate input
    if (!productID || !quantity || !address) {
        throw new ApiError(400, "All fields necessary");
    }

    // Fetch the product and update its stock
    const currentProduct = await Product.findById(productID);
    if (!currentProduct) {
        throw new ApiError(404, "Product not found");
    }

    // Check if the product has enough stock
    if (currentProduct.quantity < quantity) {
        throw new ApiError(400, "Insufficient product stock");
    }

    // Reduce the product stock
    currentProduct.quantity -= quantity;
    await currentProduct.save(); // Save the updated stock

    // Create the ProductSold entry
    const listProduct = await Order.create({
        product: currentProduct._id,
        buyer: req.user._id,  // Assuming buyer is the logged-in user
        quantity,
        address
    });

    if (!listProduct) {
        throw new ApiError(500, "Product Sell failed");
    }

    // Return success response
    return res.status(201).json(new ApiResponse(
        201,
        listProduct,
        "Product Sold and Sold Details Listed"
    ));
});


//both
const getOrder = asyncHandler(async(req,res)=>
{
    const user = req.user

    const products = await Order.find({buyer: user._id})

    return res.status(200)
    .json(new ApiResponse(200,
        products,
        "Products Fetched"
    ))

})
//seller
const getOrderSold = asyncHandler(async (req, res) => {
    const user = req.user;

    // Fetch sold items where the product's owner is the current user
    const soldItems = await Order.find()
        .populate({
            path: 'product', // Populate the product field
            match: { owner: user._id } // Filter products by owner
        })
        .populate('buyer'); // Optionally populate buyer information

    // Filter out entries where no product matches the owner condition
    const filteredItems = soldItems.filter(item => item.product !== null);

    return res.status(200).json(new ApiResponse(200, filteredItems, "ProductSold Fetched"));
});


export {listOrder,
    getOrderSold,
    getOrder
}