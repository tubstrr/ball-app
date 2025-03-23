// Libraries
const fs = require('node:fs');
const getPixels = require('get-pixels');

// Constants
const levels = 1;

// Functions
const findMedian = (numbers) => {
 let median = null;
 const middle = Math.floor(numbers.length / 2);
 const sortedNumbers = numbers.sort((a, b) => a - b);

 const isEven = numbers.length % 2 === 0;

 if (isEven) median = (sortedNumbers[middle - 1] + sortedNumbers[middle]) / 2;
 else median = sortedNumbers[middle];

 return median;
};

// Main Function
const makeLevel = (level) => {
 const image = `../assets/game/backgrounds/level_${level}/Map.png`;

 getPixels(image, (err, pixels) => {
  if (err) {
   console.log('Bad image path');
   return;
  }

  // Variables
  const [width, height, channels] = pixels.shape.slice();
  const greenPixels = {};
  const blackPixels = {};
  const whitePixels = {
   x: [],
   y: [],
  };

  // Functions
  const pixelValue = (x, y) => {
   const idx = (y * width + x) * channels;
   return pixels.data.slice(idx, idx + channels);
  };

  const isBlue = (x, y) => {
   const [r, g, b, a] = pixelValue(x, y);
   return r === 0 && g === 0 && b === 255;
  };

  const isRed = (x, y) => {
   const [r, g, b, a] = pixelValue(x, y);
   return r === 255 && g === 0 && b === 0;
  };

  const isGreen = (x, y) => {
   const [r, g, b, a] = pixelValue(x, y);
   return r === 0 && g === 255 && b === 0;
  };

  const isBlack = (x, y) => {
   const [r, g, b, a] = pixelValue(x, y);
   return r === 0 && g === 0 && b === 0;
  };

  const isWhite = (x, y) => {
   const [r, g, b, a] = pixelValue(x, y);
   return r === 255 && g === 255 && b === 255;
  };

  for (let x = 0; x <= width; x++) {
   for (let y = 0; y <= height; y++) {
    if (isGreen(x, y) || isWhite(x, y)) {
     if (!greenPixels[x]) {
      greenPixels[x] = [[y, y]];
     }

     const currentSet = greenPixels[x].length - 1;
     const [min, max] = greenPixels[x][currentSet];

     if (max === y - 1) {
      greenPixels[x][currentSet][1] = y;
     } else {
      greenPixels[x].push([y, y]);
     }
    }

    if (isBlack(x, y)) {
     if (!blackPixels[x]) {
      blackPixels[x] = [[y, y]];
     }

     const currentSet = blackPixels[x].length - 1;
     const [min, max] = blackPixels[x][currentSet];

     if (max === y - 1) {
      blackPixels[x][currentSet][1] = y;
     } else {
      blackPixels[x].push([y, y]);
     }
    }

    if (isWhite(x, y)) {
     const hasX = whitePixels.x.includes(x);
     const hasY = whitePixels.y.includes(y);
     if (!hasX) whitePixels.x.push(x);
     if (!hasY) whitePixels.y.push(y);
    }

    if (y === height && greenPixels[x]) {
     if (greenPixels[x]) greenPixels[x].shift();
     if (blackPixels[x]) blackPixels[x].shift();
    }
   }
  }

  const start = {
   x: findMedian(whitePixels.x),
   y: findMedian(whitePixels.y),
  };

  // Write to file
  fs.writeFileSync(
   `../assets/game/backgrounds/level_${level}/Map.json`,
   JSON.stringify({
    width,
    height,
    columns: greenPixels,
    win: blackPixels,
    start,
   })
  );
 });
};

for (let i = 1; i <= levels; i++) {
 console.log(`Making level ${i}`);
 makeLevel(i);
}
