import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/category.model.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//seller

const listProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    specifications,
    quantity,
    price,
    categoryName,
    categoryDescription,
    categoryParentName,
  } = req.body;

  const sellerId = req.user._id;

  //console.log(categoryName)
  if (
    !title ||
    !description ||
    !specifications ||
    !quantity ||
    !price ||
    !categoryName ||
    !categoryDescription
  ) {
    throw new ApiError(400, "Details are Missing");
  }

  let category = await Category.findOne({ name: categoryName });

  // If category does not exist, create a new one
  if (!category) {
    const newCategory = new Category({
      name: categoryName,
      description: categoryDescription,
      parent: (await Category.findOne({ name: categoryParentName })) || null, // Parent category can be optional
    });

    category = await newCategory.save();
  }

  const file = req.files?.image ? req.files.image[0] : null;

  if (!file) {
    throw new ApiError(400, "Image Missing");
  }

  const localPath = file?.path;

  const imageUrl = await uploadOnCloudinary(localPath);

  if (!imageUrl || !imageUrl.url) {
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }

  const newProduct = await Product.create({
    title,
    description,
    specifications, // assuming it's an array of strings
    quantity,
    owner: sellerId, // The seller who uploaded the product
    category,
    price,
    image: imageUrl.url, // Set image URL from Cloudinary
  });

  if (!newProduct) {
    throw new ApiError(500, "Product not uploaded");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, newProduct, "Product Listed"));
});

const getUserProducts = asyncHandler(async (req, res) => {
  const sellerId = req.user._id;

  const products = await Product.find({ owner: sellerId });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products Fetched"));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  return res
    .status(200)
    .json(new ApiResponse(200, products, "All Product Fetched"));
});

const getProductProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Details are Missing");
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(500, "Product not Found");
  }

  return res.status(200).json(new ApiResponse(200, product, "Product Found"));
});

const getProductAccToCategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    throw new ApiError(400, "Category name is required");
  }

  const category = await Category.findOne({ name: categoryName });

  // If no category is found, return an error
  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  // Find products that belong to the found category
  const products = await Product.aggregate([
    {
      $match: {
        category: category._id, // Match the products with the found category _id
      },
    },
    {
      $lookup: {
        from: "users", // Join with 'User' collection
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails", // Add owner details to the result
      },
    },
    {
      $unwind: "$ownerDetails", // Flatten the owner details array
    },
    {
      $lookup: {
        from: "categories", // Join with 'Category' collection
        localField: "category",
        foreignField: "_id",
        as: "categoryDetails", // Add category details to the result
      },
    },
    {
      $unwind: "$categoryDetails", // Flatten the category details array
    },
    {
      $project: {
        title: 1,
        description: 1,
        specifications: 1,
        quantity: 1,
        image: 1,
        "ownerDetails.name": 1,
        "ownerDetails.email": 1,
        "categoryDetails.name": 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Category Products fetched"));
});

const updateLike = asyncHandler(async (req, res) => {
  const { productID } = req.body;

  if (!productID) {
    throw new ApiError(400, "Product ID is missing");
  }

  // Increment the 'like' field by 1
  const product = await Product.findByIdAndUpdate(
    productID, // Find the product by ID
    { $inc: { like: 1 } }, // Increment the 'like' field by 1
    { new: true } // Return the updated document
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Return the updated product as response
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product like updated successfully"));
});

const deleteLike = asyncHandler(async (req, res) => {
  const { productID } = req.body;

  if (!productID) {
    throw new ApiError(400, "Product ID is missing");
  }

  // Increment the 'like' field by 1
  const product = await Product.findByIdAndUpdate(
    productID, // Find the product by ID
    { $inc: { like: -1 } }, // Increment the 'like' field by 1
    { new: true } // Return the updated document
  );

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // Return the updated product as response
  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product like updated successfully"));
});

export {
  getUserProducts,
  listProduct,
  getAllProducts,
  getProductAccToCategory,
  updateLike,
  deleteLike,
  getProductProfile,
};
