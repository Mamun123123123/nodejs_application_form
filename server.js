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

app.get("/application", (req, res) => {
  res.sendFile(path.join(__dirname, "public/application.html"));
});

app.post("/submit-application", (req, res) => {
  const { name, email, course, applied_on } = req.body;
  const sql = "INSERT INTO applications (name, email, course, applied_on) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, course, applied_on], (err, result) => {
    if (err) throw err;
    res.send("<h2>✅ Application submitted successfully! <a href='/application'>Back</a></h2>");
  });
});

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}/application`));
