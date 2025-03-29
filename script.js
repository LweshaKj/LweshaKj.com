// GitHub Repository Info
const user = 'your-username'; // Replace with your GitHub username
const repo = 'your-repo-name'; // Replace with your repository name
const branch = 'main'; // Branch where images are stored (usually 'main' or 'master')

// The folder in your GitHub repo where the images are stored
const imageFolderPath = 'images'; // Replace with the folder path, e.g., 'images/pens'

// Fetch image files from the specified folder
function fetchImageFiles() {
  const apiUrl = `https://api.github.com/repos/${user}/${repo}/contents/${imageFolderPath}?ref=${branch}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayImages(data);
    })
    .catch(error => {
      console.error('Error fetching data from GitHub API:', error);
    });
}

// Display images dynamically on the webpage
function displayImages(files) {
  const container = document.getElementById('products-container');
  
  files.forEach(file => {
    if (file.type === 'file' && /\.(jpg|jpeg|png|gif|bmp)$/i.test(file.name)) {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('product-category');
      
      const img = document.createElement('img');
      img.src = file.download_url;  // Direct download URL to the file
      img.alt = file.name;

      // Use the image file name (without extension) as the product name
      const productName = file.name.split('.')[0];  // Remove the file extension

      const pName = document.createElement('p');
      pName.textContent = productName;  // Display the filename as the product name

      const productDiv = document.createElement('div');
      productDiv.classList.add('product');
      productDiv.appendChild(img);
      productDiv.appendChild(pName);
      categoryDiv.appendChild(productDiv);
      container.appendChild(categoryDiv);
    }
  });
}

// Fetch and display images when the page loads
window.onload = fetchImageFiles;
