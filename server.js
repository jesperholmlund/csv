const express = require("express");
const app = express();
const ejs = require("ejs");
const parse = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("views/includes/notes.csv")
  .pipe(parse({ skipLines: 7 }))
  .on("data", (data) => {
    results.push(data.Annotation);
  })
  .on("end", (data) => {
    console.log(results);
  });

app.listen(4000, function (results) {});
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  app.use("/views", express.static("views"));
  res.render("index.ejs", { results });
});

app.get("/move=:id", (req, res) => {
  let i = req.params.id;
  results.splice([i], 1);
  res.redirect("/");
});

const repeat = [];
app.get("/repeat=:id", (req, res) => {
  let i = req.params.id;
  let repeatObj = Object.assign(results[i]);
  repeat.push(repeatObj);
  console.log(repeat);
  res.redirect("/");
});
