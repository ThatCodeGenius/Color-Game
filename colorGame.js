/*
STEPS BREAKDOWN:
1. PAGE LOAD SOUND:
   - Play a sound when the page is loaded using window.onload.

2. GUESS BOARD:
   - Get all necessary HTML elements: colorBox, color option buttons, score elements, etc.

3. TARGET BUTTON:
   - Attach an event listener to the buttons so when clicked, it compares the selected color with the target color.

4. NEW GAME:
   - Reset the game score and reinitialize the game setup when the "New Game" button is clicked.

5. SCORE BOARD BUTTONS:
   - Update the score and display the correct or incorrect guess based on user selection.

6. SOUNDS:
   - Play the correct sound when the player guesses right or wrong.

7. GAME LOGIC:
   - Generate a random target color.
   - Randomly assign color options to the buttons without duplication.
   - Compare the player's selected color with the target color and update the score accordingly.
   - Render color descriptions based on the target color.

8. NEW GAcolor-description-themeME LOGIC:
   - Reset all the elements when a new game is started, and generate new random colors.
*/

 // PAGE LOAD SOUND

// GUESS BOARD
const colorBox = document.querySelector('.colorBox');
const colorOptionButtons = document.querySelectorAll(".colorOption");

const colorDescription = document.querySelector('.colorDescription');
const colorDescriptionTheme = document.querySelector('.colorDescriptionTheme');

// TARGET BUTTON
const buttonclicked = document.querySelector('.buttonclicked');

// NEW GAME
const newGame = document.querySelector('.newGameButton');

// SCORE BOARD BUTTONS
const Score = document.querySelector('.score');

const gameStatus = document.querySelector('.gameStatus');

// SOUNDS
const guessedRightSound = document.querySelector('.js-guessed-right-sound');
const guessedWrongSound = document.querySelector('.js-guessed-wrong-sound');
const newGameSound = document.querySelector('.js-new-game-sound');

// PAGE LOAD SOUND
window.onload = function () {
  const pageLoadSound = document.querySelector('.page-load-sound');
  pageLoadSound.play().catch((error) => {
    console.error('Error playing audio:', error);
  });

  initializeGame();
};

let gameScore = 0;
let targetColor = ''; 

const colors = ["Red", "Blue", "Green", "Yellow", "Brown", "Purple"];

function generateRandomColors() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// GENERATE RANDOM COLOR OPTIONS FOR BUTTONS
function generateRandomOptionColors() {
  const availableColors = [...colors];
  const usedColors = [];

  colorOptionButtons.forEach(colorOptionButton => {
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    const color = availableColors.splice(randomIndex, 1)[0]; 
    colorOptionButton.style.backgroundColor = color;
    colorOptionButton.dataset.coloroptionId = color;
    colorOptionButton.style.opacity = 0.8;

    usedColors.push(color);
  });
}

// ADD SCORE AND UPDATE GAME STATUS
const addScoreAndUpdateGameStatus = (colorSelected) => {
  if (colorSelected !== targetColor) {
    gameScore--;
    gameStatus.innerHTML = 'Your guess is wrong';
    buttonclicked.innerHTML = `You chose ${colorSelected} color, Target color is ${targetColor}`;
    guessedWrongSound.play();
  } else {
    gameScore++;
    gameStatus.innerHTML = 'You guessed right &#128512';
    buttonclicked.innerHTML = `You chose ${colorSelected} color, Target color is ${targetColor}`;
    gameStatus.classList.add('hidden');

    setTimeout(() => {
      gameStatus.classList.remove('hidden');
    }, 1000);

    guessedRightSound.play();
  }

  Score.innerHTML = gameScore;
};

// RENDER COLOR DESCRIPTION  
const rendercolorDescription = () => {
  const colorDescriptions = {
    Red: 'Red is a bold color symbolizing passion, strength, and energy, creating warmth, tension, and contrast in art.',
    Blue: 'Blue evokes tranquility, stability, and peace, ranging from soft sky hues to deep ocean shades, each with its own mood.',
    Green: 'Green symbolizes growth, harmony, and renewal, ranging from calming pastels to vibrant tones, reflecting nature"s vitality.',
    Yellow: 'Yellow symbolizes warmth, optimism, and joy, evoking creativity and positivity with its bright, energizing tones.',
    Brown: 'Brown symbolizes warmth, stability, and comfort, with earthy tones that evoke reliability and connection to nature.',
    Purple: 'Purple symbolizes creativity, nobility, and spirituality, conveying elegance, mystery, and depth through its rich hues.',
  };

  colorDescription.innerHTML = colorDescriptions[targetColor] || '';
  colorDescriptionTheme.innerHTML = colorDescription.innerHTML !== '' ? '' : 'This section provides a detailed description of each color displayed on the screen.';
};

// RENDER TARGET COLOR 
const rendertargetColor = (event) => {
  const colorOptionButton = event.target;
  const colorSelected = colorOptionButton.dataset.coloroptionId;

  addScoreAndUpdateGameStatus(colorSelected);

  targetColor = generateRandomColors();
  colorBox.style.backgroundColor = targetColor;

  generateRandomOptionColors();

  rendercolorDescription();
};

function initializeGame() {
  targetColor = generateRandomColors(); 
  colorBox.style.backgroundColor = targetColor;
  rendercolorDescription(); 

  generateRandomOptionColors(); 
}

// NEW GAME LOGIC

newGame.addEventListener('click', () => {
  gameScore = 0; 

  colorBox.style.backgroundColor = '';
  colorDescription.innerHTML = '';
  buttonclicked.innerHTML = '';
  gameStatus.innerHTML = '';
  Score.innerHTML = '';

  colorDescriptionTheme.innerHTML = 'This section provides a detailed description of each color displayed on the screen, offering insights into their characteristics, significance, and visual impact.';

  initializeGame();
});

// LOOP OVERR EACH COLOR OPTION BUTTON AND ADD THE EVENT LOSTER FOR CLICKS
colorOptionButtons.forEach((colorOptionButton) => {
  colorOptionButton.addEventListener("click", rendertargetColor);
});
