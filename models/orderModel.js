const mongoose = require("mongoose");

const Order = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    meals: [
      {
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    resturant: {
      type: String,
      required: true,
      ref: "Resuturant",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    history: [
      {
        updateid: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("Order", Order);

module.exports = order;
