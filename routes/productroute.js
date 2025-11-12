const express = require("express");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsBySubcategory,
  searchProducts,
  updateStock,
} = require("../controllers/productController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductById);
router.route("/products/category/:categoryId").get(getProductsByCategory);
router.route("/products/subcategory/:subcategoryId").get(getProductsBySubcategory);
router.route("/products/search").get(searchProducts);

router.route("/products").post(protect, createProduct);
router.route("/products/:id").put(protect, updateProduct).delete(protect, deleteProduct);
router.route("/products/:id/stock").put(protect, updateStock);

module.exports = { router };
