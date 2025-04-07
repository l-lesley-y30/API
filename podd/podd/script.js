// API keys and URLs for fetching quotes and images
const quoteApiKey = "pwvp8t1Yt7r6BL14k56LLw==a3w85m1RDIdniGj9";
const quoteApiUrl = "https://api.api-ninjas.com/v1/quotes";  // URL for quote API

const imageApiKey = 'sZPdNy5wSGnffudbele9zEz22qVuB76ZEsLRhQ5aURFLay3OpA5ibuwt';  // Pexels API Key for image search
const imageApiUrl = 'https://api.pexels.com/v1/search?query=cool+wallpaper&per_page=5';  // URL for fetching cool wallpapers

// Function to fetch a random quote
const getQuote = () => {
  return fetch(quoteApiUrl, {
    method: "GET",  // Sending GET request to quote API
    headers: {
      "X-API-Key": quoteApiKey,  // Adding API key for authorization
    }
  })
    .then(response => response.json())  // Convert response to JSON format
    .then(data => {
      console.log("API Response (Quote):", data);  // Log the quote data for debugging
      const quoteText = data[0].quote;  // Extract the quote text
      const quoteAuthor = data[0].author;  // Extract the author name

      // Update the DOM with the fetched quote and author
      document.getElementById("quote").textContent = `${quoteText}`;
      document.getElementById("author").textContent = `- ${quoteAuthor}`;
    })
    .catch(error => {
      console.error("Error fetching quote:", error);  // Log any errors
      document.getElementById("quote").textContent = "An error occurred. Try again later.";  // Display error message
      document.getElementById("author").textContent = "- Unknown";  // Display unknown author
    });
};

// Function to generate a random greeting from a list
function getRandomGreeting() {
  const greetings = ["Hello!", "Good day!", "Hi there!", "Greetings!"];
  const index = Math.floor(Math.random() * greetings.length);  // Random index for selecting a greeting
  return greetings[index];
}

// Function to fetch a random image from Pexels
function fetchImageFromPexels() {
  return fetch(imageApiUrl, {
    headers: {
      Authorization: imageApiKey  // Authorization header with API key
    }
  })
    .then(response => response.json())  // Parse the response into JSON
    .then(data => {
      if (data.photos && data.photos.length > 0) {  // Check if there are photos in the response
        const randomIndex = Math.floor(Math.random() * data.photos.length);  // Select a random photo
        return data.photos[randomIndex].src.original;  // Return the original image URL
      } else {
        throw new Error("No images found.");  // Error handling if no images are found
      }
    });
}

// Function to update the page content with a new quote and image
function updateContent() {
  const greeting = getRandomGreeting();  // Get a random greeting
  document.getElementById("greeting").textContent = greeting;  // Display the greeting on the page

  // Fetch a random image and update the image element
  fetchImageFromPexels()
    .then(imageUrl => {
      document.getElementById("apod-image").src = imageUrl;  // Set the new image source
      document.getElementById("apod-image").alt = "Cool Wallpaper";  // Set the image alt text
      document.getElementById("apod-image").style.display = "block";  // Ensure the image is displayed
    })
    .catch(error => {
      console.error("Error fetching image:", error);  // Log any image fetch errors
      document.getElementById("greeting").textContent = "Something went wrong. Try again later.";  // Display error message
    });

  // Fetch and display a new quote
  getQuote();
}

// Initialize with default content on page load
document.addEventListener("DOMContentLoaded", () => {
  // Set default quote and author
  document.getElementById("quote").textContent = "The only way to do great work is to love what you do.";
  document.getElementById("author").textContent = "- Steve Jobs";

  // Set default image (NASA image)
  document.getElementById("apod-image").src = "https://apod.nasa.gov/apod/image/2104/hubble_1042.jpg";
  document.getElementById("apod-image").alt = "Default NASA Image";

  // Trigger content update when the page loads
  updateContent();
});

// Event listener for the "Generate" button to update content when clicked
document.getElementById("generate-btn").addEventListener("click", updateContent);
