require("express-async-errors");
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
// const port = 8080;

const useShipment = require("./routes/shipment");
const useShipper = require("./routes/userRoute");
const useBankDetails = require("./routes/bankdetails");
const useHome = require("./routes/homeRouter");
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

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

// app.listen(port, () => {
//   console.log("Listening to Port ", port);
// });
app.use(express.static("../Shipper_Client/build"));

app.get("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "Shipper_Client", "build", "index.html")
  );
});

app.set("port", process.env.PORT || 8000);
console.log("App is listening" + app.get("port"));
module.exports = app;
