const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

module.exports = protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      console.log("jwt secret", process.env.JWT_SECRET);
      token = req.headers.authorization.split(" ")[1];
      console.log("token", req.headers);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      // console.log("error", error);
      throw new Error("user Authentication is failed");
    }
  } else {
    res.status(401);
    throw new Error("user Authentication is failed");
  }
});
