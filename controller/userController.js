const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//Register user controller
const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, isOwner } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);

    throw new Error("User already Exist! ");
  } else {
    const user = await User.create({
      firstname,
      lastname,
      email,
      password,
      isOwner,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        isOwner: user.isOwner,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("there is an error in create values");
    }
  }
});
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ((!email, !password)) {
    res.status(400).json({
      error: "email and password is required",
    });
  }

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      isOwner: user.isOwner,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      Token: generateToken(user._id),
    });
  } else {
    const error = "Invalid Eamil or password";
    error.statusCode = 401;
    throw error;
  }
});
module.exports = { registerUser, loginUser };
