import { error } from "console";
import express from "express";
import mysql from "mysql";
import path, { dirname } from "path";

const app = express();
const port = 3000;
const __dirname = path.resolve();

app.use(express.urlencoded({ extended: true }));

const database = mysql.createConnection({
  host: "<HOSTNAME>",
  user: "<USERNAME>",
  password: "<PASSWORD>",
});

database.connect((err) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log("Connected with MySql Database");
  }
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let dbname = req.body.dbname;
  let sql = `CREATE DATABASE ${dbname}`;

  database.query(sql, (err) => {
    if (err) {
      console.error(err.stack);
    } else {
      console.log(`Database Created with DB_Name: ${dbname}`);
      res.send(`Database Created with DB_Name: ${dbname}`);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is up and Running on Port ${port}`);
});
