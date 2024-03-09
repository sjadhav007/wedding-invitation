function fetchImages() {
  fetch('https://www.googleapis.com/drive/v3/files?q="1N9p1rhoJV0RNxZvkkUg7KUuFvL-jfnS3"+in+parents&fields=files(*)&key=AIzaSyBHo4YGUV5D7Zw7ihEv5verlOFvHc9RYrQ')
  .then(response => response.json())
  .then(data => {
      // Filter out images from the response
      const images = data.files.filter(file => file.mimeType.startsWith('image/'));
      
      // Display images in the container if it exists
      const container = document.getElementById('drive-image-container');
      if (container) {
          images.forEach(image => {
              const imgElement = document.createElement('img');
              // Construct direct download link for each image
              imgElement.src = `https://drive.google.com/thumbnail?id=${image.id}`;
              imgElement.classList.add('gallery-image');
              container.appendChild(imgElement);
          });
      } else {
          console.error('Container element not found.');
      }
  })
  .catch(error => console.error('Error fetching images:', error));
}



// Call the function to fetch images when the page loads
window.onload = fetchImages;