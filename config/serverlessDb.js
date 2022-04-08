const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;

module.exports = connectToDatabase = () => {
  console.log(process.env.MONGO_URI);
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose.connect(process.env.MONGO_URI).then((db) => {
    isConnected = db.connections[0].readyState;
  });
};
