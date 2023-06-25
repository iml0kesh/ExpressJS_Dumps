const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let items = [];



app.get("/", function (req, res) {

  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { WhatDay: day, newListItems: items});
});

app.post("/", function (req, res) {
  let item = req.body.newitem;
  items.push(item);
  res.redirect("/");
})

app.listen(3000, function () {
  console.log("Server is up and running aon 3000");
});
