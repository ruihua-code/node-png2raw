import * as fs from "fs";
import { PNG } from "pngjs";

function writeRGB565(pixelList) {
  const byteArr = [];
  for (const pixel of pixelList) {
    const r = (pixel[0] >> 3) & 0x1f;
    const g = (pixel[1] >> 2) & 0x3f;
    const b = (pixel[2] >> 3) & 0x1f;
    const value = (r << 11) + (g << 5) + b;
    const highByte = (value >> 8) & 0xff;
    const lowByte = value & 0xff;
    byteArr.push(highByte, lowByte);
  }
  return Buffer.from(byteArr);
}

const inputFilePath = "images/Wechat.png";
const outputFilePath = "images/Wechat.raw";

fs.createReadStream(inputFilePath)
  .pipe(new PNG())
  .on("parsed", function () {
    const pixelData = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2; // RGBA
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        pixelData.push([r, g, b]);
      }
    }

    const byteData = writeRGB565(pixelData);

    fs.writeFile(outputFilePath, byteData, (err) => {
      if (err) {
        console.error("无法保存文件", err);
      } else {
        console.log("成功保存文件");
      }
    });
  });
