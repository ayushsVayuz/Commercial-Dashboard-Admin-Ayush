const express = require("express");
const path = require("path");
const app = express();
require("dotenv").config();
console.log("dddddddddd", process.env.PORT);
app.use(express.static(path.join(__dirname, "../") + "dist"));
app.get("/*", function (req, res) {
  console.log("hitttssss>>>>>>>>>>>>>>>>");
  res.sendFile("index.html", { root: "./../dist" });
});
app.listen(process.env.PORT);
