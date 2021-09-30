import express from "express";
import {
  createProduct,
  createReview,
  deleteProduct,
  getProduct,
  getProducts,
  getTopRatedProducts,
  updateAProduct,
} from "../controllers/productController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id/reviews").get(getProducts).post(protect, createReview);
router.get("/top", getTopRatedProducts);
router
  .route("/:id")
  .get(getProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateAProduct);

export default router;
