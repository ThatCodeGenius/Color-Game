/*
STEPS
1. SAVE DATA i.e color and color description
2. GET ALL HTML ELEMENT FROM THE DOM INTO JAVASCRIPT
i. Guess Board
ii. Target Button
iii. New Game Button
iv. Score Board Buttons
v. Sounds

3. MAKE PAGE INTERACTIVE
i. Page Load Sound
ii. Game Score
iii. Generate a random color 
iv. Function to assign random colors to the option buttons, ensuring uniqueness (Randomly assign colors to each button without duplication)
v. Compare the computer's color with the player's choice ( // Show the score decision again after 1 second)
vi. Render the description based on the computer's selected color
vii. Render the computer's randomly selected color and compare with player's choice
viii. Attach event listeners to each color option button
ix. Initialize game with random colors for buttons on page load
x.
*/


//PAGE LOAD SOUND
  window.onload = function () {
    const pageLoadSound = document.querySelector('.page-load-sound');
    pageLoadSound.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  }

  // GUESS BOARD
  const displayComputerRandomColor = document.querySelector('.js-colorBox');
  const colorOptionButtons = document.querySelectorAll(".js-colorOption");
  const colorBoxDisplay = document.querySelector(".js-colorBox");
  const colorDescription = document.querySelector('.js-color-description');
  const colorDescriptionTheme = document.querySelector('.js-color-description-theme');

  // TARGET BUTTON
  const buttonSelected = document.querySelector('.js-button-selected');

  // NEW GAME
  const newGame = document.querySelector('.js-newGameButton');

  // SCORE BOARD BUTTONS
  const scoreDisplay = document.querySelector(".js-score");
  const playerGuess = document.querySelector('.js-player-guess');
  const computerGuess = document.querySelector('.js-computer-guess');
  const scoreDecision = document.querySelector('.score-decision');

  // SOUNDS
  const guessedRightSound = document.querySelector('.js-guessed-right-sound');
  const guessedWrongSound = document.querySelector('.js-guessed-wrong-sound');
  const newGameSound = document.querySelector('.js-new-game-sound');


  let gameScore = {
    win: 0,
    losses: 0,
  };

  const colors = ["Red", "Blue", "Green", "Yellow", "Brown", "Purple"]; 
  
  function generateRandomColors() {
    return colors[Math.floor(Math.random() * colors.length)];
  }
 
  function generateRandomOptionColors() {
    const availableColors = [...colors]; 
    const usedColors = []; 
    

    colorOptionButtons.forEach(colorOptionButton => {
      
      const randomIndex = Math.floor(Math.random() * availableColors.length);
      const color = availableColors.splice(randomIndex, 1)[0]; 
      colorOptionButton.style.backgroundColor = color; 
      colorOptionButton.dataset.coloroptionId = color; 
      colorOptionButton.style.opacity = 0.6;

      usedColors.push(color); 
    });
  }

  // Compare the computer's color with the player's choice ( // Show the score decision again after 1 second)
  const compareColorsAndAddResult = (computerRandomColor, colorSelected) => {
    if (colorSelected !== computerRandomColor) {
      gameScore.losses++;
      scoreDecision.innerHTML = 'Your guess is wrong';
      buttonSelected.innerHTML = `You chose ${colorSelected} color, Computer chose ${computerRandomColor} color`;
      guessedWrongSound.play();
    } else {
      gameScore.win++;
      scoreDecision.innerHTML = 'You guessed right &#128512';
      buttonSelected.innerHTML = `You chose ${colorSelected} color, Computer chose ${computerRandomColor} color`;
      scoreDecision.classList.add('hidden');

      setTimeout(() => {
        scoreDecision.classList.remove('hidden');
      }, 1000);

      guessedRightSound.play();
    }

    playerGuess.innerHTML = `You ${gameScore.win}`;
    computerGuess.innerHTML = `Computer ${gameScore.losses}`;
  };

  // Render the description based on the computer's selected color
  const renderColorDescription = (computerRandomColor) => {
    const colorDescriptions = {
      Red: 'Red is a bold color symbolizing passion, strength, and energy, creating warmth, tension, and contrast in art.',
      Blue: 'Blue evokes tranquility, stability, and peace, ranging from soft sky hues to deep ocean shades, each with its own mood.',
      Green: 'Green symbolizes growth, harmony, and renewal, ranging from calming pastels to vibrant tones, reflecting nature"s vitality.',
      Yellow: 'Yellow symbolizes warmth, optimism, and joy, evoking creativity and positivity with its bright, energizing tones.',
      Brown: 'Brown symbolizes warmth, stability, and comfort, with earthy tones that evoke reliability and connection to nature.',
      Purple: 'Purple symbolizes creativity, nobility, and spirituality, conveying elegance, mystery, and depth through its rich hues.',
    };

    colorDescription.innerHTML = colorDescriptions[computerRandomColor] || '';
    colorDescriptionTheme.innerHTML = colorDescription.innerHTML !== '' ? '' : 'This section provides a detailed description of each color displayed on the screen.';
  };

  // Render the computer's randomly selected color and compare with player's choice
  const renderComputerColor = (event) => {
    const colorOptionButton = event.target;
    const colorSelected = colorOptionButton.dataset.coloroptionId;
    const computerRandomColor = generateRandomColors();
  
    displayComputerRandomColor.style.backgroundColor = computerRandomColor;
    renderColorDescription(computerRandomColor);

    compareColorsAndAddResult(computerRandomColor, colorSelected);
    generateRandomOptionColors()
  };

  // New Game Logic
    newGame.addEventListener('click', () => {
    gameScore.win = 0;
    gameScore.losses = 0;

    colorBoxDisplay.style.backgroundColor = '';
    colorDescription.innerHTML = '';
    buttonSelected.innerHTML = '';
    scoreDecision.innerHTML = '';
    playerGuess.innerHTML = '';
    computerGuess.innerHTML = '';

    colorDescriptionTheme.innerHTML = 'This section provides a detailed description of each color displayed on the screen, offering insights into their characteristics, significance, and visual impact.';

    generateRandomOptionColors();
  });

  // Attach event listeners to each color option button
  colorOptionButtons.forEach((colorOptionButton) => {
    colorOptionButton.addEventListener("click", renderComputerColor);
  });

  // Initialize game with random colors for buttons on page load
  generateRandomOptionColors();
