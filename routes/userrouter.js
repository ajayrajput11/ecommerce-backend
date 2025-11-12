const express = require("express");
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);

router.route("/:id").delete(protect, deleteUser);

module.exports = {router};
