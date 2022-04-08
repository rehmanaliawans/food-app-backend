const Item = require("../models/itemModel");
const asyncHandler = require("express-async-handler");

const getItem = asyncHandler(async (req, res) => {
  const item = await Item.find({ resturant: req.params.id });
  res.json(item);
});

const createItem = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    res.status(400);
    throw new Error("please fill all the fields");
  } else {
    const item = Item({
      resturant: req.params.id,
      title,
      description,
      price,
    });
    const createitem = await item.save();

    res.status(201).json(createitem);
  }
});
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(400);
    throw new Error("Item not find by this id");
  }
});
const updateItem = asyncHandler(async (req, res) => {
  const { title, description, price } = req.body;
  const item = await Item.findById(req.params.id);

  if (item) {
    item.title = title;
    item.description = description;
    item.price = price;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(400);
    throw new Error("Item not found");
  }
});

const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);

  if (item) {
    await item.remove();
    res.json({ message: "Item Removed succesfully" });
  } else {
    res.status(400);
    throw new Error("Item not found");
  }
});

module.exports = { createItem, getItem, updateItem, deleteItem, getItemById };
