const mongoose = require("mongoose");

const addResturant = mongoose.Schema(
  {
    resturantName: {
      type: String,
      required: true,
    },
    foodType: {
      type: String,
      required: true,
    },
    aptName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "USER",
    },
  },
  {
    timestamps: true,
  }
);

const Resuturant = mongoose.model("Resuturant", addResturant);

module.exports = Resuturant;
