// STEPS
  /*
  1. Get all elements from the DOM into JavaScript
  2. SAVE COLOR DATA
    Generate random colors and create color index for computer 
    Initialize win and losses counters
    Compare colors and update the results
    render the background color of the box to the randomly selected color when targeted colorOptionButton is clicked
     add page load sound as well as right guess and wrong guess
    add winning animation effect using set timeout at 500
  3. MAKE PAGE INTERACTIVE
  */

//PAGE LOAD SOUND
  window.onload = function () {
    const pageLoadSound = document.querySelector('.page-load-sound');
    pageLoadSound.play().catch((error) => {
      console.error('Error playing audio:', error);
    });
  }

  const DisplayComputerRandomColor = document.querySelector('.js-colorBox');
  const colorOptionButtons = document.querySelectorAll(".js-colorOption");
  const colorBoxDisplay = document.querySelector(".js-colorBox");
  const colorDescription = document.querySelector('.js-color-description');
  const colorDescriptionTheme = document.querySelector('.js-color-description-theme');

  //TARGET BUTTON
  const buttonSelected = document.querySelector('.js-button-selected');

  // NEW GAME
  const newGame = document.querySelector('.js-newGameButton');
    
  //SCORE BOARD BUTTONS
  const scoreDisplay = document.querySelector(".js-score");
  const playerGuess = document.querySelector('.js-player-guess');
  const computerGuess = document.querySelector('.js-computer-guess');
  const scoreDecision = document.querySelector('.score-decision');

  //SOUNDS
  const guessedRightSound = document.querySelector('.js-guessed-right-sound'); 
  const guessedWrongSound = document.querySelector('.js-guessed-wrong-sound');
  const newGameSound = document.querySelector('.js-new-game-sound');

let gameScore = {
    win: 0,
    losses: 0,
  };

function generateRandomColors() {
    const colors = ["Red", "Blue", "Green", "Yellow", "Brown", "Purple"]; 
    return colors[Math.floor(Math.random() * colors.length)];
}

const compareColorsAndAddResult = (computerRandomColor, colorSelected) => { 
    if (colorSelected !== computerRandomColor) {
        gameScore.losses++; 
        scoreDecision.innerHTML = 'Your guess is wrong';

        buttonSelected. innerHTML = `You chose ${colorSelected} color, Computer chose ${computerRandomColor} color`;

        guessedWrongSound.play();
        
    } else {
        gameScore.win++;  

        scoreDecision.innerHTML = 'You guessed right &#128512';
        
       buttonSelected. innerHTML = `You chose ${colorSelected} color, Computer chose ${computerRandomColor} color`;

        scoreDecision.classList.add('hidden');

        setTimeout(function() {
           scoreDecision.classList.remove('hidden');
        }, 1000); 

        guessedRightSound.play();
    }
    
    playerGuess.innerHTML = `You ${ gameScore.win}`;
    computerGuess.innerHTML = `Computer ${ gameScore.losses}`;
};

const renderComputerColor = (event) => {
    const colorOptionButton = event.target;
    const colorSelected = colorOptionButton.dataset.coloroptionId;
    
     const computerRandomColor = generateRandomColors();

    DisplayComputerRandomColor.style.backgroundColor = computerRandomColor;
    
    const colorDescription = renderColorDescription(computerRandomColor);

    compareColorsAndAddResult(computerRandomColor, colorSelected);
};

const renderColorDescription = (computerRandomColor) =>{
     
   if(computerRandomColor ===  "Red"){
      colorDescription.innerHTML = 'Red is a powerful and emotionally charged color that evokes passion, strength, and energy, while also conveying warmth, tension, and contrast, making it a captivating focal point in any artwork.'
   } 
   else if(computerRandomColor ===  "Blue"){
      colorDescription.innerHTML ='Blue is a calm, serene color often associated with tranquility, depth, and stability, evoking feelings of peace and introspection. It spans a wide range from the pale, soft hues of a summer sky to the deep, intense shades of the ocean, each conveying its own unique mood and energy.'
   } 
   else if(computerRandomColor ===  "Green"){
      colorDescription.innerHTML ='Green is a refreshing, rejuvenating color that symbolizes growth, harmony, and nature’s balance, evoking a sense of renewal and vitality. It ranges from soft, calming pastels to rich, vibrant tones, each reflecting the life and abundance of the natural world.'
   } 
   else if(computerRandomColor ===  "Yellow"){
    colorDescription.innerHTML ='Yellow is a bright, energizing color that radiates warmth, optimism, and joy, often symbolizing light and happiness. From soft buttery tones to bold, sunlit shades, yellow invokes creativity and a sense of positivity, lighting up any space or design.'
   } 
   else if(computerRandomColor ===  "Brown"){
  colorDescription.innerHTML ='Brown is a grounded, earthy color that exudes warmth, stability, and natural richness, often evoking feelings of comfort and reliability. Its varied tones, from soft sand to deep chestnut, connect us to the organic world, offering a sense of rootedness and strength.'
   } 
   else if(computerRandomColor ===  "Purple"){
     colorDescription.innerHTML ='Purple is a luxurious, mystical color that symbolizes creativity, nobility, and spiritual depth, often associated with both mystery and elegance. Ranging from soft lavender to deep violet, it conveys a sense of richness, introspection, and refined beauty.'
   } 

   if(colorDescription.innerHTML !== ''){
    colorDescriptionTheme.innerHTML =''
    } 
};
  
colorOptionButtons.forEach((colorOptionButton) => {
    colorOptionButton.addEventListener("click", renderComputerColor);
});

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
  });