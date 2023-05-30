const canvas = new fabric.Canvas('canvas', { backgroundColor: 'lightgray' });

// Load image on canvas
function loadImage(imageURL) {
  fabric.Image.fromURL(imageURL, (img) => {
    img.scaleToWidth(canvas.width);
    canvas.add(img);
    canvas.renderAll();
  }, { crossOrigin: "Anonymous" });
}

function addCaptions() {

  // Load the image onto the canvas
  fabric.Image.fromURL(imageURL, (img) => {

    // Add caption text
    const caption = new fabric.Textbox('Your Caption', {
      left: 10,
      top: 10,
      width: 200,
      fontSize: 16,
      fill: 'black',
    });
    canvas.add(caption);

    canvas.renderAll();
  });
}

function addShape(shape) {

  // Add shape based on the provided type

  switch (shape) {
    case 'rectangle':
      const rectangle = new fabric.Rect({
        left: 10,
        top: 10,
        width: 100,
        height: 50,
        fill: 'royalblue',

      });
      canvas.add(rectangle);
      break;
    case 'circle':
      const circle = new fabric.Circle({
        left: 10,
        top: 10,
        radius: 50,
        fill: 'orange',
      });
      canvas.add(circle);
      break;
    case 'triangle':
      const triangle = new fabric.Triangle({
        left: 10,
        top: 10,
        width: 100,
        height: 100,
        fill: 'red',
      });
      canvas.add(triangle);
      break;
    case 'polygon':
      const points = [
        { x: 10, y: 10 },
        { x: 50, y: 50 },
        { x: 90, y: 10 },
        { x: 70, y: 90 },
        { x: 30, y: 90 }
      ];
      const polygon = new fabric.Polygon(points, {
        left: 10,
        top: 10,
        fill: 'green'
      });
      canvas.add(polygon);
      break;
    default:
      console.log('Invalid shape');
      break;
  }
}

// Function to delete
function deleteSelectedObject() {
  const activeObject = canvas.getActiveObject();
  if (activeObject) {
    canvas.remove(activeObject);
    canvas.discardActiveObject();
    canvas.renderAll();
  }
}

function logCanvasLayers() {
  const layers = [];

  // Iterate over the canvas objects
  canvas.getObjects().forEach(obj => {
    // Check the object type and add it to the layers array
    if (obj.type === 'image') {
      layers.push(' [Image]');
    } else if (obj.type === 'rect') {
      layers.push(' [Rectangle]');
    } else if (obj.type === 'circle') {
      layers.push(' [Circle]');
    } else if (obj.type === 'triangle') {
      layers.push(' [Triangle]');
    } else if (obj.type === 'polygon') {
      layers.push(' [Polygon]');
    } else if (obj.type === 'textbox') {
      layers.push(' [Text]');
    }
  });
  
  console.log(layers.join(''));
}

// Event listener for "Add Captions" button
const addCaptionsBtn = document.getElementById('add-captions-btn');
addCaptionsBtn.addEventListener('click', addCaptions);

// Get the selected image URL from the query parameter
const urlParams = new URLSearchParams(window.location.search);
const imageURL = decodeURIComponent(urlParams.get('imageURL'));

// Load the image onto the canvas
loadImage(imageURL);

// Event listener for shape buttons
const shapeButtons = document.querySelectorAll('.shape-btn');
shapeButtons.forEach(shapeBtn => {
  shapeBtn.addEventListener('click', () => {
    const shape = shapeBtn.getAttribute('data-shape');
    addShape(shape);
  });
});

// Event listener for delete button
const deleteBtn = document.getElementById('delete-btn');
deleteBtn.addEventListener('click', deleteSelectedObject);

// Event listener for "Log Layers" button
const logLayersButton = document.getElementById('log-layers-btn');
logLayersButton.addEventListener('click', logCanvasLayers);


// Event listener for "Download" button
const downloadButton = document.getElementById('download-btn');
downloadButton.addEventListener('click', () => {
  // Generate the updated image with captions and shapes
  const dataURL = canvas.toDataURL({
    format: 'png',
    quality: 1
  });

// Create a temporary link element to initiate the download
  const downloadLink = document.createElement('a');
  downloadLink.href = dataURL;
  downloadLink.download = 'updated-image.png';

// Trigger the download
  downloadLink.click();
});


