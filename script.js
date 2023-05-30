// Unsplash access key
//const ACCESS_KEY = 'lziOPwd5HDc-kRTvNNNkogMX0zfKGtptzl_FyjS8hNo';

//Secret Key
//_r7_X9DWv4aFMYL80tEt5o8ZXX_JyDbN8TMUDC9C8I4

// Authorization code
// 21dbwo0ZvQE7lYJyZsu3BEEppQucY9VZLEYeJ8vYW-o

// Unsplash API endpoint URL
const API_ENDPOINT = 'https://api.unsplash.com/search/photos';


// Function to perform image search
async function searchImages(keyword) {
  const endpoint = `${API_ENDPOINT}?query=${encodeURIComponent(keyword)}`;
  
  const response = await fetch(endpoint, {
    headers: {
      Authorization: 'Client-ID lziOPwd5HDc-kRTvNNNkogMX0zfKGtptzl_FyjS8hNo', 
    },
  });

  
  if (!response.ok) {
    throw new Error('Error occurred during image search: ' + response.status);
  }

  const data = await response.json();
  console.log(data.results);
  return data.results;
}


// Function to display search results
function displayResults(images) {
  const resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '';

// Checking if images array is defined and not empty
  if (Array.isArray(images) && images.length > 0) {
    images.forEach(image => {
      const thumbnail = document.createElement('img');
      thumbnail.src = image.urls.regular;
      thumbnail.alt = image.title;
      thumbnail.classList.add('thumbnail');

      const captionButton = document.createElement('button');
      captionButton.textContent = 'Add Caption';
      captionButton.className="BB"
  

      const resultItem = document.createElement('div');
      resultItem.appendChild(thumbnail);
      resultItem.appendChild(captionButton);

      resultsContainer.appendChild(resultItem);

      captionButton.addEventListener('click', () => {
      // Logic to navigate to the canvas page with selected image
        const canvasURL = 'canvas.html?imageURL=' + encodeURIComponent(image.urls.regular);
       
        window.location.href = canvasURL;
      });
    });
  } else {
    const message = document.createElement('p');
    message.textContent = 'No images found.';
    message.classList.add('no-image-message'); // Add a class for styling purposes
    resultsContainer.appendChild(message);
    
  }
}

// Make the Image Hidden 
const sandImage = document.getElementById('sand-image');

// Event listener for search button
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', async () => {

  sandImage.style.display = 'none';
  const searchInput = document.getElementById('search-input');
  const keyword = searchInput.value.trim();

  if (keyword !== '') {
    try {
      const images = await searchImages(keyword);
      displayResults(images);
    } catch (error) {
      console.log('Error occurred during image search:', error);
    }
  }
 
});




