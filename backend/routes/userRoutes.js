import express from "express";
import {
  authUser,
  createNewUser,
  getUserProfile,
  getUsers,
  deleteUser,
  updateUserProfile,
  getUserById,
  updateUserByAdmin,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/login").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/").post(createNewUser).get(protect, admin, getUsers);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserByAdmin);
export default router;
