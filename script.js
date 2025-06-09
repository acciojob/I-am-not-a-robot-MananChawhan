// Images sources
const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg",
];

const imageContainer = document.getElementById("imageContainer");
const message = document.getElementById("h");
const para = document.getElementById("para");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");

let selectedImages = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// Initialize the game
function init() {
  selectedImages = [];
  para.textContent = "";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // Clear container
  imageContainer.innerHTML = "";

  // Pick a random index to duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);

  // Prepare the 6 images array with one duplicate
  const imgArray = images.slice(0, 5); // Take first 5 unique images
  imgArray[duplicateIndex] = images[duplicateIndex]; // Ensure duplicate will be one of them
  // Insert the duplicate
  imgArray.push(images[duplicateIndex]);

  // Shuffle the 6 images
  shuffleArray(imgArray);

  // Create image elements
  imgArray.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.src = src;
    img.addEventListener("click", () => onImageClick(img));
    imageContainer.appendChild(img);
  });
}

function onImageClick(img) {
  // Prevent selecting more than 2 images
  if (selectedImages.length >= 2) return;

  // Prevent selecting the same image twice
  if (selectedImages.includes(img)) return;

  // Mark image as selected
  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length === 1) {
    resetBtn.style.display = "inline-block";
    verifyBtn.style.display = "none";
    para.textContent = "";
  } else if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  // Reset state
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  para.textContent = "";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
});

verifyBtn.addEventListener("click", () => {
  verifyBtn.style.display = "none";

  if (selectedImages.length !== 2) return;

  const [img1, img2] = selectedImages;

  if (img1.dataset.src === img2.dataset.src) {
    para.textContent = "You are a human. Congratulations!";
  } else {
    para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
});

// Initialize on page load
window.onload = init;
