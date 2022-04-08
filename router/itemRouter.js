const express = require("express");
const protect = require("../middleWare/authMiddleWare");
const {
  createItem,
  getItem,
  updateItem,
  deleteItem,
  getItemById,
} = require("../controller/ItemController");

const restrictTo = require("../middleWare/restrictToMiddleWare");
const router = express.Router();

router.route("/:id").get(protect, getItem);
router.route("/create/:id").post(protect, restrictTo(true), createItem);
router
  .route("/:id")
  .put(protect, restrictTo(true), updateItem)
  .delete(protect, restrictTo(true), deleteItem);
router.route("/fetchsingle/:id").get(getItemById);
module.exports = router;
