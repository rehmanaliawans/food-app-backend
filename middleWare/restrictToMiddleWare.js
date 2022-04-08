const User = require("../models/userModel");

module.exports = restrictTo = (...isOwner) => {
  return (req, res, next) => {
    if (!isOwner.includes(req.user.isOwner)) {
      return next(
        res.status(401).json("You are not authorized to access this resource.")
      );
    }
    next();
  };
};
