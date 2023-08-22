Core

HTML:
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Shadow Man</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="guess-block">
    <img class="hidden-man" src="img/shadow-man-hidden.png">
    <label class="player-guess" for="player-guess">Guess the DStv Premiership  player:</label>
    <div class="autocomplete">
      <input type="text" id="player-guess" aria-autocomplete="list" autocomplete="off">
      <div id="options-container" class="options-dropdown" role="listbox"></div>
    </div>
  </div>

  <div class="all-attempts">
    <div class="main-attempts">
      <div class="attempt-1-container">
        <div class="player-name-label"><span id="selected-player-name"></span></div>
        <div class="attempt-1">
          <div class="circle-container">
            <div class="circle" data-attribute="playerNationality"></div>
            <div class="label">Nationality</div>
          </div>
          <div class="circle-container">
            <div class="circle" data-attribute="club"></div>
            <div class="label">Club</div>
          </div>
          <div class="circle-container">
            <div class="circle" data-attribute="playerBirthday"></div>
            <div class="label">Age</div>
          </div>
          <div class="circle-container">
            <div class="circle" data-attribute="jerseyNo"></div>
            <div class="label">Jersey No.</div>
          </div>
          <div class="circle-container">
            <div class="circle" data-attribute="playerPosition"></div>
            <div class="label">Position</div>
          </div>
        </div>
      </div>
    </div>
    <div id="attempts-wrapper"></div>
  </div>

  <div class="modal" id="modal">
    <div class="modal-content">
      <h2>Game Over</h2>
      <p id="modal-message"></p>
      <button id="close-modal">Close</button>
    </div>
  </div>

  <script src="scripts.js"></script>
</body>
</html>


CSS:
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  background-image: linear-gradient(-200deg, #000039 50%, #1883c7 180%);
}

label {
  color: white;
  padding-bottom: 10px;
  text-align: center;
  align-content: center;
  align-items: center;
  align-self: center;
}

.player-guess {
  color: black;
  display: block;
}

.guess-block {
  width: 60%;
  background-color: white;
  border-radius: 20px;
  text-align: center;
}

.hidden-man {
  width: 30%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.all-attempts {
  max-height: 60vh; /* Adjust the maximum height as needed */
  overflow-y: auto; /* Enable vertical scroll if content overflows */
  width: 100%; /* Make the div take the full width */
  margin-top: 20px; /* Add spacing at the top */
}

.attempt-1 {
  display: flex;
  justify-content: center; /* Center the circles horizontally */
}

.attempt-1-container {
  /* Add padding between attempts */
  padding-bottom: 10px;
}

.circle-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: grey;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
  /* Adjust font size and colors if needed */
  overflow: hidden;
  padding: 5px;
}

.circle img {
  max-width: 100%;
  max-height: 100%;
}

.label {
  font-size: 12px;
  color: white;
}

.player-name-label {
  margin-top: 10px;
  font-weight: bold;
  /* Set the player's name as bold */
  text-align: center;
  /* Center the player's name */
  color: white;
}

.autocomplete {
  position: relative;
  display: block;
  align-content: center;
  text-align: center;
  padding-bottom: 20px;
}

.options-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  z-index: 1;
}

.option {
  padding: 8px 12px;
  cursor: pointer;
}

.option:hover {
  background-color: #ddd;
}

/* Styling for the text input */
#player-guess {
  padding: 10px;
  border: 2px solid #007bff;
  /* Set the border color */
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

/* Styling for the attempt container */
.attempt {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  /* Set the background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

/* Styling for the player name and surname */
.player-info {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin-bottom: 10px;
}

/* Styling for the circles in each attempt */
.circle-attempt {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
}

.attempt-container {
  margin-top: 20px;
  /* Adjust the margin as needed */
}

.main-attempts {
  display: none;
}

/* Styling for the modal */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  /* Transparent black background with 10% opacity */
  justify-content: center;
  align-items: center;
  z-index: 9999;
  /* Place the modal on top of other content */
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Styling for the Close button */
#close-modal {
  margin-top: 10px;
  padding: 8px 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

#close-modal:hover {
  background-color: #0056b3;
}

/* Center the modal content horizontally and vertically */
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  /* Adjust the width as needed */
  max-width: 80%;
  /* Adjust the maximum width as needed */
  min-height: 200px;
  /* Adjust the height as needed */
}

/* Define the pop animation */
@keyframes pop {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Apply the animation to the circle-container elements */
.circle-container.pop-animation {
  animation: pop 0.5s ease-in-out;
}


JavaScript:

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("player-guess");
  const circles = document.querySelectorAll(".circle");
  const optionsContainer = document.getElementById("options-container");
  const playerNameLabel = document.getElementById("selected-player-name");
  const attemptContainer = document.querySelector(".attempt-1-container");
  const attemptsWrapper = document.getElementById("attempts-wrapper"); // Wrapper for all attempts
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const closeModalButton = document.getElementById("close-modal");

  let players = []; // Store the players data
  let currentOptionIndex = -1; // Track the currently focused option
  let hiddenPlayer; // Store the randomly chosen hidden player
  let attemptNumber = 1; // Track the number of attempts

  function updateGuessPlaceholder() {
    inputField.placeholder = `GUESS ${attemptNumber} OF 8`;
  }

  inputField.addEventListener("input", () => {
    const playerGuess = inputField.value.trim().toLowerCase();

    if (playerGuess.length >= 2) {
      const matchedPlayers = players.filter((player) => {
        const fullName = `${player.playerName.toLowerCase()} ${player.playerSurname.toLowerCase()}`;
        return (
          player.playerName.toLowerCase().startsWith(playerGuess) ||
          player.playerSurname.toLowerCase().startsWith(playerGuess)
        );
      });

      displayOptions(matchedPlayers);
    } else {
      clearOptions();
    }
  });

  function displayOptions(matchedPlayers) {
    optionsContainer.innerHTML = "";

    matchedPlayers.forEach((player, index) => {
      const option = document.createElement("div");
      option.className = "option";
      option.textContent = `${player.playerName} ${player.playerSurname}`;
      option.addEventListener("click", () => handleOptionSelection(player));
      option.addEventListener("mouseover", () => highlightOption(index));
      optionsContainer.appendChild(option);
    });

    if (matchedPlayers.length > 0) {
      optionsContainer.style.display = "block";
      currentOptionIndex = -1; // Reset the currently focused option when options are displayed
    } else {
      clearOptions();
    }
  }

  function clearOptions() {
    optionsContainer.innerHTML = "";
    optionsContainer.style.display = "none";
    currentOptionIndex = -1;
  }

  function handleOptionSelection(selectedPlayer) {
    const guessedNationality = selectedPlayer.playerNationality.toLowerCase().replace(/\s/g, "-");
    const guessedClub = selectedPlayer.club.toLowerCase().replace(/\s/g, "-");
    const guessedAge = calculateAge(selectedPlayer.playerBirthday);
    const guessedJerseyNo = selectedPlayer.jerseyNo;
    const guessedPosition = getPlayerPositionAbbreviation(selectedPlayer.playerPosition);

    const isCorrectNationality = guessedNationality === hiddenPlayer.playerNationality.toLowerCase().replace(/\s/g, "-");
    const isCorrectClub = guessedClub === hiddenPlayer.club.toLowerCase().replace(/\s/g, "-");
    const isCorrectAge = guessedAge === calculateAge(hiddenPlayer.playerBirthday);
    const isCorrectJerseyNo = guessedJerseyNo === hiddenPlayer.jerseyNo;
    const isCorrectPosition = guessedPosition === getPlayerPositionAbbreviation(hiddenPlayer.playerPosition);

    // Set the innerHTML of the circles to include the image tags for nationality and club
    circles[0].innerHTML = `<img src="img/countries/${guessedNationality}.png" alt="${guessedNationality}" class="circle-image" style="width: 40px; height: 40px; padding: 5px;" />`;
    circles[1].innerHTML = `<img src="img/badges/${guessedClub}.png" alt="${guessedClub}" class="circle-image" style="width: 40px; height: 40px; padding: 5px;" />`;
    checkAndDisplayArrow(circles[2], guessedAge, calculateAge(hiddenPlayer.playerBirthday));
    checkAndDisplayArrow(circles[3], guessedJerseyNo, hiddenPlayer.jerseyNo);
    circles[4].textContent = guessedPosition;

    // Update the circle colors based on correct attributes
    circles.forEach((circle, index) => {
      if ((index === 0 && isCorrectNationality) ||
          (index === 1 && isCorrectClub) ||
          (index === 2 && isCorrectAge) ||
          (index === 3 && isCorrectJerseyNo) ||
          (index === 4 && isCorrectPosition)) {
        circle.style.backgroundColor = "green";
        circle.style.color = "white";
      } else {
        circle.style.backgroundColor = "grey";
        circle.style.color = "white";
      }
    });

    playerNameLabel.textContent = `${selectedPlayer.playerName} ${selectedPlayer.playerSurname}`;

    inputField.value = ""; // Clear the input field after selection
    clearOptions();

    // Check if it's the eighth guess
    if (attemptNumber === 8) {
      // Close off the input field
      inputField.disabled = true;
      
      // Show the main attempts container
      const mainAttemptsContainer = document.querySelector(".main-attempts");
      mainAttemptsContainer.style.display = "block";
      
      // Check if the guess is incorrect
      if (!isCorrectNationality || !isCorrectClub || !isCorrectAge || !isCorrectJerseyNo || !isCorrectPosition) {
        // Delay showing the modal for 2 seconds
        setTimeout(() => {
          checkGameStatus(false); // Pass false to indicate an incorrect guess
        }, 2000);
      }
    } else {
      // Create a new container for each attempt and add it to the body
      if (attemptNumber < 8) {
        attemptNumber++;
        updateGuessPlaceholder();
        const newAttemptContainer = attemptContainer.cloneNode(true);
        newAttemptContainer.classList.replace(`attempt-${attemptNumber - 1}-container`, `attempt-${attemptNumber}-container`);
        attemptsWrapper.insertBefore(newAttemptContainer, attemptsWrapper.firstElementChild);
      } else {
        checkGameStatus(false); // Pass false to indicate an incorrect guess
      }
    }

    // Check if the guess is correct and show congratulations after 2 seconds
    if (isCorrectNationality && isCorrectClub && isCorrectAge && isCorrectJerseyNo && isCorrectPosition) {
      setTimeout(() => {
        checkGameStatus(true); // Pass true to indicate a correct guess
      }, 2000);
    }
  }

  function calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  }

  function getPlayerPositionAbbreviation(position) {
    switch (position.toLowerCase()) {
      case "goalkeeper":
        return "GK";
      case "defender":
        return "DEF";
      case "midfielder":
        return "MID";
      case "forward":
        return "FWD";
      default:
        return "";
    }
  }

  function checkAndDisplayArrow(circle, guessedValue, hiddenValue) {
    const arrowUp = '<span class="arrow-up">▲</span>';
    const arrowDown = '<span class="arrow-down">▼</span>';

    if (guessedValue < hiddenValue) {
      circle.innerHTML = `${guessedValue} ${arrowUp}`;
    } else if (guessedValue > hiddenValue) {
      circle.innerHTML = `${guessedValue} ${arrowDown}`;
    } else {
      circle.textContent = guessedValue;
    }
  }

  function highlightOption(index) {
    const options = optionsContainer.querySelectorAll(".option");
    options.forEach(option => option.classList.remove("highlight"));

    if (index >= 0 && index < options.length) {
      options[index].classList.add("highlight");
      currentOptionIndex = index;
    } else {
      currentOptionIndex = -1;
    }
  }

  function displayModal() {
    modalMessage.textContent = `Better luck next time, you didn't get it! The hidden player today was ${hiddenPlayer.playerName} ${hiddenPlayer.playerSurname}.`;
    modal.style.display = "flex";
  }

  function displayCongratulationsModal() {
    modalMessage.textContent = `Congratulations! You guessed ${hiddenPlayer.playerName} correctly. You did it in ${attemptNumber} guesses.`;
    modal.style.display = "flex";
  }

  function checkGameStatus(isCorrect) {
    if (isCorrect) {
      displayCongratulationsModal();
    } else {
      displayModal();
    }
  }

  function closeModal() {
    modal.style.display = "none";
  }

  // Close the modal when the "Close" button is clicked
  closeModalButton.addEventListener("click", closeModal);

  // Fetch the JSON data from playersDB.json and choose a random hidden player
  fetch("playersDB.json")
    .then(response => response.json())
    .then(data => {
      players = data;
      hiddenPlayer = players[Math.floor(Math.random() * players.length)];
      updateGuessPlaceholder();
    })
    .catch(error => console.error("Error fetching data:", error));
});
