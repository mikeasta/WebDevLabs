// * GAMEPLAY RULES

// Game over bool
let gameOver = false;

// Score counter
let score = 0;

// Game over 
const alertGameOver = () => {
	// This flag will be used at the conditioning
	// of game loop
	gameOver = true;

    // Draw Game over screen
    alert("Game Over!")
}


// Score and speed system
let currentLevelNum = 1


const levelSpeed = {
    "1": 1000,
    "2": 800,
    "3": 600,
    "4": 500,
    "5": 400,
    "6": 200,
    "7": 100,
}

const levelBorder = {
    "1": 100,
    "2": 200,
    "3": 300,
    "4": 400,
    "5": 500,
    "6": 600,
    "7": 700
}


// Checks and modifies level
// If true, then we'll update speed
const isNeedToUpdateSpeedAndLevel = () => {

    if (score > levelBorder[currentLevelNum + ''] && currentLevelNum != 7) {
        currentLevelNum++;
        currentLevel.innerHTML = "Текущий уровень: " + currentLevelNum;
        return true;
    }

    return false;
}


// Initial gamerules setup
const blankGameRules = () => {
    currentLevelNum = 1;
    score = 0;
    gameOver = false;
}


// Game start setup
const startGame = () => {
    // Preparings
    blankPlayground()
    blankTetramino()
    blankGameRules()

    // Start gameplay process
    getNextTetramino()
    tetramino = nameToTetramino(nextTetraminoName)
    getNextTetramino()

    let gameLoop;
    const gameIteration = () => {
        stepDownEvent();
        drawTetris();
    
        // If player overcomed special score border
        if (isNeedToUpdateSpeedAndLevel()) {
            clearInterval(gameLoop)
            gameLoop = setInterval(gameIteration, levelSpeed[currentLevelNum + ""])
        }

        // If game is over
        if (gameOver) {
            // Stop game loop
            clearInterval(gameLoop);

            // Make a note about players score
            addLeaderboardsNote(localStorage["tetris.nickname"], score)
        }
    }

    gameLoop = setInterval(gameIteration, 1000)
}