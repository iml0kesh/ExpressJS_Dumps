const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const resData = req.body;

  const firstName = resData.firstName;
  const lastName = resData.lastName;
  const email = resData.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us12.api.mailchimp.com/3.0/lists/177303e121";
  const option = {
    method: "POST",
    auth: "Lokesh:590457b93dc872754b764a190f80b5e6-us12",
  };

  const request = https.request(url, option, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function (req, res) {
  console.log("server is up and running on port 3000");
});

// API KEY
// 590457b93dc872754b764a190f80b5e6-us12

// ListID
// 177303e121
