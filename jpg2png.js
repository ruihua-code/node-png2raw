const sharp = require("sharp");
const fs = require("fs");
const request = require("request");

//随机一张320x240的照片
const imageUrl = "https://picsum.photos/320/240";


request.get(imageUrl, { encoding: null }, (err, data, body) => {
  if (err) {
    console.log("err:", err);
  } else {
    console.log(body);
    fs.writeFileSync("test2.jpg", body);
  }
});
// const imageFile = fs.readFileSync(imageUrl);
// console.log(imageFile);

// sharp(file).toFile("test.png");
