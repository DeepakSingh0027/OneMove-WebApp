import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Cart } from "../models/cart.model.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const addToCart = asyncHandler(async (req, res) => {
  const { productID, quantity } = req.body;

  if (!productID || !quantity) {
    throw new ApiError(400, "fields missing");
  }

  const currentProduct = await Product.findById(productID);

  if (!currentProduct) {
    throw new ApiError(404, "Product not found");
  }

  // Check if the product has enough stock
  if (currentProduct.quantity < quantity) {
    throw new ApiError(400, "Insufficient product stock");
  }

  const listCart = await Cart.create({
    product: currentProduct._id,
    owner: req.user._id,
    quantity,
  });

  if (!listCart) {
    throw new ApiError(500, "Cart listing failed");
  }

  return res.status(201).json(new ApiResponse(201, listCart, "Cart Updated"));
});

const getCartDetails = asyncHandler(async (req, res) => {
  const cartDetails = await Cart.find({
    owner: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, cartDetails, "Cart Details Fetched"));
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Validate the id and convert it to ObjectId
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid or missing cart item ID");
  }

  console.log(id);

  //const deletedItem = await Cart.findByIdAndDelete(id);
  // Convert both _id and owner to ObjectId
  const deletedItem = await Cart.findOneAndDelete({
    _id: id, // Ensure _id is an ObjectId
    owner: req.user._id, // Ensure owner is an ObjectId
  });

  console.log(deletedItem);

  if (!deletedItem) {
    throw new ApiError(
      404,
      "Cart item not found or you do not have permission to remove it"
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, deletedItem, "Item removed from cart successfully")
    );
});

export { addToCart, getCartDetails, removeFromCart };
