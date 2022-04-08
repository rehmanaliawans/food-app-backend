const mongoose = require("mongoose");

const Item = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    resturant: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Resuturant",
    },
  },
  {
    timestamps: true,
  }
);

const Items = mongoose.model("Item", Item);

module.exports = Items;
