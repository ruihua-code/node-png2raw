const sharp = require("sharp");
const fs = require("fs");
const request = require("request");
const images = require("images")
const pngTool = require("./png2raw");


//随机一张320x240的照片
const imageUrl = "https://picsum.photos/240/240";

function onStart() {
  console.time("image-time")
  request.get(imageUrl, { encoding: null }, async (err, data, body) => {
    if (err) {
      console.log("err:", err)
    } else {
      console.timeEnd("image-time")
      // 保存到文件
      // fs.writeFileSync("myImage.jpg", body);

      // sharp(body).toFile('my-image.png')
      await sharp(body).png().toFile("my-image.png")

      images("my-image.png").save('my-image-mini.png', {
        quality: 50
      })

      toRaw('my-image.png')
    }
  });
}


function toRaw(buffer) {
  const byteData = pngTool.pngToraw(buffer)
  fs.writeFileSync('my-image.raw', byteData)
}


onStart()
