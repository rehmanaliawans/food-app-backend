const Order = require("../models/OrderModel");
const asyncHandler = require("express-async-handler");

const getallorderlist = asyncHandler(async (req, res) => {
  const { newRestIds } = req.query;

  const order = await Order.find({ resturant: newRestIds });
  res.json(order);
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.find({ user: req.params.id });
  if (order) {
    res.json(order);
  } else {
    res.status(400);
    throw new Error("order not find by this id");
  }
});

const addOrder = asyncHandler(async (req, res) => {
  const { firstname, price, status, user, meals, history } = req.body;

  const order = Order({
    firstname,
    price,
    status,
    meals,
    resturant: req.params.id,
    user,
    history,
  });
  const addorder = await order.save();

  res.status(201).json(addorder);
});

const changeOrderStatus = asyncHandler(async (req, res) => {
  const { id, status, updateid, name } = req.body;

  const order = await Order.findById(id);

  if (order) {
    order.status = status;
    order.history = [
      ...order.history,
      {
        updateid: updateid,
        name: name,
        status: status,
        date: new Date().toLocaleString(),
      },
    ];

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(400);
    throw new Error("order not found");
  }
});

module.exports = { addOrder, getOrderById, changeOrderStatus, getallorderlist };
