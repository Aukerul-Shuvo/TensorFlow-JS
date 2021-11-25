const classifier = knnClassifier.create();
let net;

const webcamElement = document.getElementById('webcam');
// If the permission to use the webcam is approved, the webcam streaming video is designated as the source object of the "player".
var handleSuccess = function (stream) {
  webcam.srcObject = stream;};
navigator.mediaDevices.getUserMedia({ video: true }).then(handleSuccess);
// Use the mediaDevices interface of the current browser object (navigator) to receive the user's permission to use the media input device.



/*async function app() {
  console.log('Loading mobilenet..');

  // Load the model.
  net = await mobilenet.load();
  console.log('Successfully loaded model');

  // Make a prediction through the model on our image.
  const imgEl = document.getElementById('img');
  const result = await net.classify(imgEl);
  console.log(result);
}*/


async function app() {
    console.log('Loading mobilenet..');
  
    // Load the model.
    net = await mobilenet.load();
    console.log('Successfully loaded model');
    
    // Create an object from Tensorflow.js data API which could capture image 
    // from the web camera as Tensor.
    const webcam = await tf.data.webcam(webcamElement);
    while (true) {
      const img = await webcam.capture();
      const result = await net.classify(img);
  
      document.getElementById('console').innerText = `
        prediction: ${result[0].className}\n
        probability: ${result[0].probability}
      `;
      // Dispose the tensor to release the memory.
      img.dispose();
  
      // Give some breathing room by waiting for the next animation frame to
      // fire.
      await tf.nextFrame();
    }
  }

app();