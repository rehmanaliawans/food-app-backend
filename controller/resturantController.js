const Resturant = require("../models/Resuturantmodel");
const Item = require("../models/itemModel");
const asyncHandler = require("express-async-handler");

const getResturant = asyncHandler(async (req, res) => {
  const resturant = await Resturant.find({ user: req.user._id });
  res.json(resturant);
});

const createResturant = asyncHandler(async (req, res) => {
  const { resturantName, foodType, aptName, address, phoneNo, payment } =
    req.body;
  if (
    !resturantName ||
    !foodType ||
    !aptName ||
    !address ||
    !phoneNo ||
    !payment
  ) {
    res.status(400);
    throw new Error("please fill all the fields");
  } else {
    const resturant = Resturant({
      user: req.user._id,
      resturantName,
      foodType,
      aptName,
      address,
      phoneNo,
      payment,
    });
    const createresturant = await resturant.save();

    res.status(201).json(createresturant);
  }
});

const getResturantById = asyncHandler(async (req, res) => {
  const resturant = await Resturant.findById(req.params.id);
  if (resturant) {
    res.json(resturant);
  } else {
    res.status(400);
    throw new Error("Resturant not find by this id");
  }
});
const updateResturant = asyncHandler(async (req, res) => {
  const { resturantName, foodType, aptName, address, phoneNo, payment } =
    req.body;
  const resturant = await Resturant.findById(req.params.id);

  if (resturant) {
    if (resturant.user.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error("You cann't perform this action");
    }
    resturant.resturantName = resturantName;
    resturant.foodType = foodType;
    resturant.aptName = aptName;
    resturant.address = address;
    resturant.phoneNo = phoneNo;
    resturant.payment = payment;

    const updatedResturant = await resturant.save();
    res.json(updatedResturant);
  } else {
    res.status(400);
    throw new Error("Resturant not found");
  }
});

const deleteResturant = asyncHandler(async (req, res) => {
  const resturant = await Resturant.findById(req.params.id);
  const items = await Item.find({ resturant: req.params.id });

  if (resturant.user.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error("You are not authorized to perform this action");
  } else {
    if (resturant) {
      await resturant.remove();
      items.forEach((item) => {
        item.remove();
      });
      res.json({ message: "Resturant Removed succesfully with items" });
    } else {
      res.status(400);
      throw new Error("Resturant not found");
    }
  }
});

const getAllResturant = asyncHandler(async (req, res) => {
  const resturant = await Resturant.find();
  res.json(resturant);
});

module.exports = {
  getResturant,
  createResturant,
  getResturantById,
  deleteResturant,
  updateResturant,
  getAllResturant,
};
