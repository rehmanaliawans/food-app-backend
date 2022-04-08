const express = require("express");
const {
  createResturant,
  getResturant,
  getResturantById,
  updateResturant,
  deleteResturant,
  getAllResturant,
} = require("../controller/resturantController");
const protect = require("../middleWare/authMiddleWare");
const restrictTo = require("../middleWare/restrictToMiddleWare");

const router = express.Router();

router.route("/").get(protect, restrictTo(true), getResturant);
router.route("/all").get(protect, restrictTo(false), getAllResturant);
router.route("/create").post(protect, restrictTo(true), createResturant);
router
  .route("/:id")
  .get(getResturantById)
  .put(protect, restrictTo(true), updateResturant)
  .delete(protect, restrictTo(true), deleteResturant);

module.exports = router;
