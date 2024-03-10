function fetchImages() {
  fetch('https://www.googleapis.com/drive/v3/files?q="1N9p1rhoJV0RNxZvkkUg7KUuFvL-jfnS3"+in+parents&fields=files(*)&key=AIzaSyBHo4YGUV5D7Zw7ihEv5verlOFvHc9RYrQ')
  .then(response => response.json())
  .then(data => {
    const images = data.files.filter(file => file.mimeType.startsWith('image/'));

    const container = document.getElementById('drive-image-container');
    if (container) {
        images.forEach(image => {
            const imgElement = document.createElement('img');
            // Construct direct download link for each image
            imgElement.src = `https://drive.google.com/thumbnail?id=${image.id}`;
            imgElement.classList.add('gallery-image');
            // container.appendChild(imgElement);
            imgElement.addEventListener('click', function() {
              openModal(imgElement.src);
            });
            container.appendChild(imgElement);
          });
    } else {
      console.error('Container element not found.');
    }
  })
  .catch(error => console.error('Error fetching images:', error));
}

window.onload = fetchImages;

function openModal(src) {
const modalImage = document.querySelector('#galleryModal .img-modal');
modalImage.src = src;
$('#galleryModal').modal('show');
}

function loadElementToShow(direction) {
const allImages = document.querySelectorAll('#drive-image-container img');
let currentImageIndex = Array.from(allImages).findIndex(img => img.src === document.querySelector('.img-modal').src);
currentImageIndex += direction;
if (currentImageIndex >= allImages.length) {
  currentImageIndex = 0;
} else if (currentImageIndex < 0) {
  currentImageIndex = allImages.length - 1;
}
const imgSrc = allImages[currentImageIndex].src;
document.querySelector('.img-modal').src = imgSrc;
}

const prevBtn = document.querySelector('#prev-but');
const nextBtn = document.querySelector('#next-but');

prevBtn.addEventListener('click', () => loadElementToShow(-1));
nextBtn.addEventListener('click', () => loadElementToShow(1));

document.addEventListener('keydown', (event) => {
if (event.key === 'ArrowLeft') {
  loadElementToShow(-1);
} else if (event.key === 'ArrowRight') {
  loadElementToShow(1);
}
});