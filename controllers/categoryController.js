const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  try {
    const { name, description, subCategories } = req.body;
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ success: false, message: "Category already exists" });
    }
    const category = await Category.create({
      name,
      description,
      subCategories: subCategories || [],
    });
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ success: false, message: "Server error while creating category" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "All categories fetched successfully",
      count: categories.length,
      categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Server error while fetching categories" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ success: false, message: "Server error while fetching category" });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, subCategories } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    category.name = name || category.name;
    category.description = description || category.description;
    if (subCategories) category.subCategories = subCategories;
    const updatedCategory = await category.save();
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ success: false, message: "Server error while updating category" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: "Server error while deleting category" });
  }
};

const addSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    category.subCategories.push({ name, description });
    await category.save();
    res.status(201).json({
      success: true,
      message: "Subcategory added successfully",
      category,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    res.status(500).json({ success: false, message: "Server error while adding subcategory" });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const { categoryId, subId } = req.params;
    const { name, description } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    const subCategory = category.subCategories.id(subId);
    if (!subCategory) {
      return res.status(404).json({ success: false, message: "Subcategory not found" });
    }
    subCategory.name = name || subCategory.name;
    subCategory.description = description || subCategory.description;
    await category.save();
    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      category,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({ success: false, message: "Server error while updating subcategory" });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const { categoryId, subId } = req.params;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    const subCategory = category.subCategories.id(subId);
    if (!subCategory) {
      return res.status(404).json({ success: false, message: "Subcategory not found" });
    }
    subCategory.deleteOne();
    await category.save();
    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
      category,
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ success: false, message: "Server error while deleting subcategory" });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
