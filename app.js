const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

app.use(express.json());
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use("/api/", require("./routes/index"));
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database!");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
