const fs = require("fs");
const PNG = require("pngjs").PNG;

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

function pngToraw(pngPath) {
  const data = fs.readFileSync(pngPath);
  const png = PNG.sync.read(data);
  const pixelData = [];
  for (let y = 0; y < png.height; y++) {
    for (let x = 0; x < png.width; x++) {
      const idx = (png.width * y + x) << 2; // RGBA
      const r = png.data[idx];
      const g = png.data[idx + 1];
      const b = png.data[idx + 2];
      pixelData.push([r, g, b]);
    }
  }

  const byteData = writeRGB565(pixelData);
  return byteData;
}

module.exports.pngToraw = pngToraw;
