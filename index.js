import express from "express";
import path from "node:path";
import fs from "fs";
import formidable from "express-formidable";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json());
app.use(formidable({ maxFileSize: 1024 * 10, multiples: true }));

const __dirname = path.resolve();
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

  for (let item of files) {
    console.log(item.name, item.size);
  }

  res.send("ok");
});

app.listen(3000);
