import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  deleteLike,
  getAllProducts,
  getProductAccToCategory,
  listProduct,
  updateLike,
  getProductProfile,
} from "../controllers/product.controller.js";

const router = Router();
//seller
router.route("/list-product").post(
  verifyJWT,
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  listProduct
);

router.route("/product-profile/:id").post(getProductProfile);

router.route("/add-like").post(updateLike);

router.route("/del-like").post(deleteLike);
//buyer
router.route("/get-all-products").get(getAllProducts);

router.route("/get-category-products").post(getProductAccToCategory);

export default router;
