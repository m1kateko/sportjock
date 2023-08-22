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
          checkGameStatus();
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
        checkGameStatus();
      }
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

  function checkGameStatus() {
    displayModal();
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
