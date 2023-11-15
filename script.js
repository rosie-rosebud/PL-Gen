// Wrap the entire code in an async function and call it to start execution
async function main() {




// Connect HTML elements to JavaScript
const detailsDiv = document.getElementById("detailsDiv");
const recommendationsDiv = document.getElementById("recommendationsDiv");
const timeBox = document.getElementById("timeSelect");
const interestBox = document.getElementById("affordanceSelect");
const ageBox = document.getElementById("ageSelect");

// Function to display user's choices and recommendations
async function submitDetails() {
  // Show the detailsDiv
  detailsDiv.style.display = "block";

  // Get user input values
  const userTime = timeBox.value;
  const userInterest = interestBox.value;

  // Display user's choices
  const choicesMessage = `You have told us you have ${userTime} minutes to spare today, and you want to know more about how to implement ${userInterest} in your classroom. Let's take a look at your learning journey for today!`;
  document.getElementById("choices").textContent = choicesMessage;

  try {

 
    // Load recommendations from the JSON file
    const recommendations = await loadRecommendations();

    // Generate a random recommendation based on user input
    const randomRecommendation = generateRandomRecommendation(recommendations, userTime, userInterest);

    // Display the random recommendation
    recommendationsDiv.innerHTML = ''; // Clear any previous content
    if (randomRecommendation) {
      const recommendationsMessage = document.createElement("p");
      recommendationsMessage.textContent = randomRecommendation;
      recommendationsDiv.appendChild(recommendationsMessage);
    }
  } catch (error) {
    console.error("Error loading or processing recommendations:", error);
  }
}


// Function to generate a random recommendation based on loaded recommendations
function generateRandomRecommendation(recommendations, userTime, userInterest) {
  // Get recommendations for the user's selected time and interest
  const userRecommendations = recommendations[userTime] && recommendations[userTime][userInterest];

  if (!userRecommendations || userRecommendations.length === 0) {
    return "No recommendations available for your selection. Please try again.";
  }

  // Randomly select a recommendation from the list
  const randomIndex = Math.floor(Math.random() * userRecommendations.length);
  return userRecommendations[randomIndex];
}

// Function to load recommendations from the JSON file
async function loadRecommendations() {
  try {
    const response = await fetch("recommendations.json");
    if (!response.ok) {
      throw new Error("Failed to load recommendations data.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading recommendations:", error);
    throw error; // Re-throw the error to be caught by the caller
  }
}


  // Add event listener for the "Submit" button
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", submitDetails);
}

main(); // Call the main function to start the execution.
