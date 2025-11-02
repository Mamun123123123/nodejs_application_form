const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "application"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public", "home.html")));
app.get("/home", (req, res) => res.sendFile(path.join(__dirname, "public", "home.html")));
app.get("/registration", (req, res) => res.sendFile(path.join(__dirname, "public", "registration.html")));
app.get("/application", (req, res) => res.sendFile(path.join(__dirname, "public", "application.html")));

app.post("/submit-registration", (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], err => {
    if (err) throw err;
    res.send("<h2 class='text-center mt-10'>✅ Registration successful! <a href='/registration'>Back</a></h2>");
  });
});

app.post("/submit-application", (req, res) => {
  const { name, email, course, applied_on } = req.body;
  const sql = "INSERT INTO applications (name, email, course, applied_on) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, course, applied_on], err => {
    if (err) throw err;
    res.send("<h2 class='text-center mt-10'>✅ Application submitted! <a href='/application'>Back</a></h2>");
  });
});

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
