const express = require("express");
const fs = require("fs");
const formidable = require("express-formidable");
const bodyParser = require("body-parser");
const path = require("path");

const pngTool = require("./png2raw");

const app = express();
app.use(bodyParser.json());
app.use(formidable({ maxFileSize: 1024 * 10, multiples: true }));

app.use(express.static(__dirname + "/static"));

app.get("/png2raw", (_, res) => {
  const htmlFile = path.join(__dirname, "static/index.html");

  fs.readFile(htmlFile, "utf8", (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    }
  });
});

app.post("/api/png2raw", (req, res) => {
  const files = req.files.images;
  const resData = {
    images: [],
  };
  for (let item of files) {
    const byteData = pngTool.pngToraw(item.path);
    resData.images.push({
      name: item.name,
      data: byteData,
    });
  }

  res.send(resData);
});

app.listen(3000);
