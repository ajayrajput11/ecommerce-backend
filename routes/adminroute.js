const express = require("express");
const {
  getAllUsers,
  updateUserRole,
  deleteUser,
  getAllOrders,
  updateOrderStatus,
  getAllProducts,
  deleteProduct,
} = require("../controllers/adminController")

const {protect,adminOnly} = require("../middlewares/authMiddleware")


const router = express.Router()


router.route("/users").get(protect,adminOnly,getAllUsers)
router.route("/users/:id/role").put(protect,adminOnly,updateUserRole)
router.route("/users/:id").delete(protect,adminOnly,deleteUser)

router.route("/orders").get(protect,adminOnly,getAllOrders)
router.route("/orders/:id/status").put(protect,adminOnly,updateOrderStatus) 

router.route("/products").get(protect,adminOnly,getAllProducts)
router.route("/products/:id").delete(protect,adminOnly,deleteProduct)  

module.exports = {router};

