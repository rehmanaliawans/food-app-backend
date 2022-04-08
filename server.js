const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");
const userRoutes = require("./router/userRouter");
const resturantRoutes = require("./router/resturentRouter");
const itemRouter = require("./router/itemRouter");
const orderRouter = require("./router/orderRouter");
const app = express();
const cors = require("cors");
dotenv.config({ path: "./config.env" });
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Appii sending....");
});

app.use("/api/users", userRoutes);
app.use("/api/resturant", resturantRoutes);
app.use("/api/item", itemRouter);
app.use("/api/order", orderRouter);

app.listen(8000, console.log(`run server on 8000`));
