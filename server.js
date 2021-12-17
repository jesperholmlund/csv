const express = require("express");
const app = express();
const ejs = require("ejs");
const parse = require("csv-parser");
const fs = require("fs");
let results = [];
const fileUpload = require("express-fileupload");

app.use(fileUpload());

app.listen(4000, function (results) {});
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  app.use("/views", express.static("views"));
  res.render("index.ejs", { results });
  app.post("/upload", function (req, res) {
    results = [];
    let csvFile = "";
    let path;
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send("no file uploaded");
    }
    csvFile = req.files.csvFile;
    console.log(csvFile);
    path = __dirname + "/csv-files/" + csvFile.name;
    console.log(path);
    csvFile.mv(path, function (err) {
      if (err) return res.status(500).send(err);
    });
    fs.createReadStream(path)
      .pipe(parse({ skipLines: 7 }))
      .on("data", (data) => {
        results.push(data.Annotation);
      })
      .on("end", (data) => {
        fs.unlink(path, function (err) {
          if (err) throw err;
          console.log("deleted");
          res.redirect("/");
        });
      });
  });
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
