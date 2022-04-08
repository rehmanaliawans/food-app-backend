const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("url", process.env.MONGO_URI);
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongo db connect with ${con.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);
    process.exit;
  }
};

module.exports = connectDB;
