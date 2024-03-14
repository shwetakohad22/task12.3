// Function to retrieve the meaning of a word and display it on the webpage
function getWordMeaning() {
  // Get the user-inputted word from the input field
  const wordInput = document.getElementById("wordInput").value;

  // Check if the input is empty
  if (!wordInput) {
    alert("Please enter a word.");
    return;
  }

  // Call the fetchData function with the entered word
  fetchData(wordInput)
    .then((data) => {
      // If data is available, display the meaning
      if (data.length > 0) {
        displayMeaning(data[0].meanings);
      } else {
        // If no data is available, display an error message
        displayMeaningError();
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      displayMeaningError();
    });
}

// Function to fetch data from the Dictionary API using Promise
function fetchData(word) {
  // Return a Promise to handle asynchronous fetching
  return new Promise((resolve, reject) => {
    // Use fetch to retrieve data from the API
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

// Function to display the meaning of the word on the webpage
function displayMeaning(meanings) {
  // Get the HTML element where the meaning will be displayed
  const meaningOutput = document.getElementById("meaningOutput");

  // Set the initial content as the heading
  meaningOutput.innerHTML = "<h3>Meaning:</h3>";

  // Loop through the meanings and display each part of speech and definition
  meanings.forEach((meaning) => {
    const partOfSpeech = meaning.partOfSpeech || "N/A";
    const definition = meaning.definitions[0].definition || "N/A";

    // Create HTML to display the part of speech and definition
    const meaningHTML = `
      <p><strong>${partOfSpeech}:</strong> ${definition}</p>
    `;

    meaningOutput.innerHTML += meaningHTML;
  });
}

// Function to display an error message when fetching data fails
function displayMeaningError() {
  const meaningOutput = document.getElementById("meaningOutput");

  meaningOutput.innerHTML =
    '<p class="text-danger">Unable to fetch the meaning. Please try again later.</p>';
}
