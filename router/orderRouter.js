const express = require("express");
const protect = require("../middleWare/authMiddleWare");
const {
  addOrder,
  getOrderById,
  changeOrderStatus,
  getallorderlist,
} = require("../controller/OrderController");

const restrictTo = require("../middleWare/restrictToMiddleWare");
const router = express.Router();

router.route("/").get(getallorderlist);
router.route("/:id").get(protect, restrictTo(false), getOrderById);
router.route("/add/:id").post(protect, restrictTo(false), addOrder);
router.route("/order-status").put(protect, changeOrderStatus);
module.exports = router;
