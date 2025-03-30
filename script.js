// GitHub Repository Info
const user = 'LweshaKj'; 
const repo = 'LweshaKj.com'; 
const branch = 'main'; 

// Update this if images are inside a different folder
const imageFolderPath = ''; // Set to '' if images are in the root

// Fetch image files from GitHub API
function fetchImageFiles() {
  const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${imageFolderPath}?ref=${branch}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (!Array.isArray(data)) {
        console.error('Invalid response from GitHub API:', data);
        return;
      }
      displayImages(data);
    })
    .catch(error => {
      console.error('Error fetching data from GitHub API:', error);
    });
}

// Display images dynamically
function displayImages(files) {
  const container = document.getElementById('products-container');
  container.innerHTML = ''; // Clear previous content

  files.forEach(file => {
    if (file.type === 'file' && /\.(jpg|jpeg|png|gif|bmp)$/i.test(file.name)) {
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      const img = document.createElement('img');
      img.src = file.download_url;
      img.alt = file.name;

      const productName = file.name.split('.')[0];
      const pName = document.createElement('p');
      pName.textContent = productName;

      productDiv.appendChild(img);
      productDiv.appendChild(pName);
      container.appendChild(productDiv);
    }
  });
}

// Fetch images when the page loads
window.onload = fetchImageFiles;
