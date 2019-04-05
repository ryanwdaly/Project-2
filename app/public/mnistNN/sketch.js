let mnist;
let trainIndex = 0;
let testIndex = 0;
let nn;
let userDigit;
let trainImage;
let totalTests = 0;
let totalCorrect = 0;

function setup() {
  createCanvas(400, 200).parent("canvas");
  nn = new NeuralNetwork(784, 16, 10)
    loadMNIST(function(data) {
      mnist = data;
      console.log(mnist)
    })

    userDigit = createGraphics(200-1, 200-1);
    userDigit.pixelDensity(1);
    trainImage = createImage(28, 28);
}


function draw() {
    background(0)
    guessUserDigit();
    stroke(255);
    line(width/2 -1, 0, width/2 - 1, height)

    if (mnist) {
      let total = 10;
      for (let i = 0; i < total; i++) {
        if (i == total - 1) {
          train(true);
        } else {
          train(false);
        }
      }
      for (let i = 0; i < total; i++) {
        testing();
      }
    }

    image(userDigit, 0, 0)
    if (mouseIsPressed) {
      userDigit.stroke(255);
      userDigit.strokeWeight(15)
      userDigit.line(mouseX, mouseY, pmouseX, pmouseY)
    }

}

function train(show) {
  console.log(trainIndex)
  let inputs = [];
  trainImage = createImage(28, 28);

  if (show) {
    trainImage.loadPixels();
  }

  for (let i = 0; i < 784; i++) {
      let bright = mnist.trainImages[i + trainIndex * 784];
      inputs[i] = bright/255; // Normalize data

      if (show) {
        let index = i * 4;
        trainImage.pixels[index + 0] = bright;
        trainImage.pixels[index + 1] = bright;
        trainImage.pixels[index + 2] = bright;
        trainImage.pixels[index + 3] = 255;
      }

  }
  if (show) {
    trainImage.updatePixels();
    image(trainImage, 200, 0, 200, 200);
  }

  let label = mnist.trainLabels[trainIndex];
  let targets = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  targets[label] = 1;
  // console.log(inputs)
  // console.log(targets)

  let prediction = nn.predict(inputs);
  let guess = findMax(prediction)
  nn.train(inputs, targets)
  trainIndex = (trainIndex + 1) % mnist.trainLabels.length;
  
}

function findMax(arr) {
  let record = 0;
  let index = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > record)  {
      record = arr[i];
      index = i;
    }
  }
  return index;
}

function keyPressed() {
  if (key == ' ') {
    userDigit.background(0)
  }
}

function guessUserDigit() {
  let img = userDigit.get();
  let inputs = [];
  img.resize(28, 28);
  img.loadPixels();
  for (let i = 0; i < 784; i++) {
    inputs[i] = img.pixels[i*4]; // Normalize data 
  }
  img.updatePixels();
  let prediction = nn.predict(inputs);
  let guess = findMax(prediction);
  select("#user-guess").html(guess);
  return img;
}

function testing() {
  let inputs = [];
  for (let i = 0; i < 784; i++) {
      let bright = mnist.testImages[i + testIndex * 784];
      inputs[i] = bright/255; // Normalize data

  }
  let label = mnist.testLabels[testIndex];

  let prediction = nn.predict(inputs);
  let guess = findMax(prediction)
  totalTests++;
  if (guess === label) {
    totalCorrect++;
  }
  
  let percentCorrect = 100 * (totalCorrect/totalTests);

  select("#percent").html(nf(percentCorrect, 2, 1) + '%');

  testIndex = (testIndex + 1) % mnist.testLabels.length;
}