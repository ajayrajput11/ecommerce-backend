const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/orders").post(protect, createOrder);
router.route("/orders/my").get(protect, getUserOrders);
router.route("/orders/:id").get(protect, getOrderById);
router.route("/orders/:id/cancel").put(protect, cancelOrder);

module.exports = { router };
