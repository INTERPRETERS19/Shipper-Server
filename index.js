require("express-async-errors");
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connection = require("./db");
const cors = require("cors");
const port = 8080;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

(async function db() {
  await connection();
})();

app.use(cors());
app.use(express.json());

// API routes
app.use("/", require("./routes/userRoute"));
// const useShipment = require("./routes/shipments");
// app.use(useShipment);
// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

app.use((error, req, res, next) => {
  res.status(500).json({ error: error.message });
});

app.listen(port, () => {
  console.log("Listening to Port ", port);
});

module.exports = app;
