require("express-async-errors");
require("dotenv").config();

const mongoose = require("mongoose");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const port = 8080;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const useShipment = require("./routes/shipment");
const useShipper = require("./routes/userRoute");
const useBankDetails = require("./routes/bankdetails");
const useHome = require("./routes/homeRouter");
const useReview = require("./routes/review");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

(async function db() {
  await connection();
})();

app.use(cors());
app.use(express.json());

// API routes
const imageRouter = require('./routes/imageRoute');
app.use('/image', imageRouter);

app.use("/", require("./routes/userRoute"));
app.use(useShipment);
app.use(useShipper);
app.use(useBankDetails);
app.use(useHome);
app.use(useReview);
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;
