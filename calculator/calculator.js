const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const { log } = require("console");

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
  console.log("At home page");
});

app.post("/", function (req, res) {
    console.log(req.body);

    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const result = num1 + num2;
    res.send(num1 +" + "+num2+" = " + result);
    
});

app.listen(3000, function () {
  console.log("Port running on 3000");
});
