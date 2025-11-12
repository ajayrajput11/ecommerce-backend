const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} = require("../controllers/wishListControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router
  .route("/wishlist")
  .get(protect, getWishlist)
  .post(protect, addToWishlist)
  .delete(protect, clearWishlist);

router.route("/wishlist/:productId").delete(protect, removeFromWishlist);

module.exports = { router };
