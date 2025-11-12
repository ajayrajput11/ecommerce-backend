const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/categories").get(getAllCategories).post(createCategory);

router.route("/categories/:id").get(getCategoryById).put(updateCategory).delete(deleteCategory);

router.route("/categories/:id/subcategories").post(addSubCategory);

router.route("/categories/:categoryId/subcategories/:subId").put(updateSubCategory).delete(deleteSubCategory);

module.exports = { router };
