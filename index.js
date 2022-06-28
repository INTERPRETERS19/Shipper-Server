const http = require("http");
require("express-async-errors");
require("dotenv").config();

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const port = 8080;
const useShipment = require("./routes/shipment");
const useShipper = require("./routes/userRoute");
const useBankDetails = require("./routes/bankdetails");
const useHome = require("./routes/homeRouter");
// const imageRouter=require ('./routes/image');

const useReview = require('./routes/review');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

(async function db() {
  await connection();
})();

app.use(cors());
app.use(express.json());

// API routes
app.use("/", require("./routes/userRoute"));
app.use(useShipment);
app.use(useShipper);
app.use(useBankDetails);
app.use(useHome);
// app.use('/image',imageRouter);
app.use(useReview);
app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;
// // });
// http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "text/plain" });
//   response.end("Hello World!");
// });
// const port = 8000;
// // const port = process.env.PORT || 8000;
// app.listen(port);

// console.log(`App is listening ${port}`);
// // response.end("Hello World!");
// module.exports = app;
