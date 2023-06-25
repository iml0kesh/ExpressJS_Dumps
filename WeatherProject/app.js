const express = require("express");
const https = require("https");
const { send } = require("process");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.cityName;
    const apiKey = "###########";
    const units = "metric";

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;

  https.get(url, function (response) {
    console.log(response);
    console.log(response.statusCode);

    response.on("data", function (data) { 
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const img = weatherData.weather[0].icon;
      const imgUrl = `https://openweathermap.org/img/wn/${img}@2x.png`;

      res.write(`<h1>The temp at ${query} is ${temp} </h1>`);
      res.write(`<h1>description is ${description} </h1>`);
      res.write(`<p> <img src="${imgUrl}" ></p>`);
      res.send();
    });
  }); 
});

app.listen(3000, function () {
  console.log("Server up and Running At 3000");
});
