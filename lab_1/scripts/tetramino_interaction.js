// Playground setup
let playground = []

// Initial playground setup
const blankPlayground = () => {
    for (let row = -2; row < 20; row++) {
        playground[row] = []
        for (let col = 0; col < 10; col++) {
            playground[row][col] = 0
        }
    }
}

// Tetramino generator
class Tetramino {
    constructor(name, matrix, row, col) {
        this.name   = name;
        this.matrix = matrix;
        this.row    = row;
        this.col    = col;
    }
}


// Tetramino sequence
let tetraminoSequence = []


// Current and next tetramino
// We need to store next tetramino name to show
// it in the canvas#next-shape DOM object
let tetramino, nextTetraminoName;


// Initial tetramino setup
const blankTetramino = () => {
    tetramino = null;
    nextTetraminoName = null;
    tetraminoSequence = [];
}


// Random integer generator
const getRandomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


// Tetramino sequence generator (randomly)
const generateSequence = () => {
    // Copying tetramino labels from "database"
    let tetraminoLabels = labels.slice();

    // Removing letters from tetraminoLabels array
    // during filling the sequence
    while (tetraminoLabels.length) {
        const randomInteger = getRandomInteger(0, tetraminoLabels.length - 1);
        tetraminoSequence.push(tetraminoLabels.splice(randomInteger, 1)[0])
    }
}


// Get next tetramino
const getNextTetramino = () => {
    // If there is no prepared tetramino sequence
    if (!tetraminoSequence.length) generateSequence()

    nextTetraminoName = tetraminoSequence.splice(0, 1)[0]
}


// Convert tetramino name to playable object
const nameToTetramino = name => {
    // Take pattern of current tetramino
    const matrix = tetraminos[name]

    // I starts from 21 row (offset -1), other - from 22 (offset -2)
    const row = name === "I" ? -1 : -2;

    // I and O starts from the middle
    // Other - to the left
    const col = playground[0].length / 2 - Math.ceil(matrix[0].length / 2);

    // Return object
    return new Tetramino(name, matrix, row, col)
}


// Tetramino rotation function
const rotateTetramino = matrix => {
    const maxIndex = matrix.length - 1;
    const rotated  = matrix.map((row, i) =>
        row.map((value, j) => matrix[maxIndex - j][i])
    );

    return rotated;
}


// Check if we can move tetramino's matrix  
// on the current position
const isValidMove = (matrix, startRow, startCol) => {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {
            if (
                matrix[row][col] &&
                (
                    startCol + col < 0 || 
                    startCol + col >= playground[0].length || 
                    startRow + row >= playground.length ||
                    playground[startRow + row][startCol + col]
                )
            ) {
                return false;
            }
        }
    }

    return true;
}


// Process of placing tetramino on the board
const placeTetramino = () => {
    // Place tetramino 
    for (let row = 0; row < tetramino.matrix.length; row++) {
        for (let col = 0; col < tetramino.matrix[0].length; col++) {
            if (tetramino.matrix[row][col]) {
                // Check if tetramino overcomed the upper border
                if (tetramino.row + row < 0) return alertGameOver();
                playground[tetramino.row + row][tetramino.col + col] = tetramino.name;
            }
        }
    }

    // Check if there any filled rows
    for (let row = playground.length - 1; row >= 0;) {
        if (playground[row].every(cell => !!cell)) {
            for (offsetRow = row; offsetRow >= 0; offsetRow--) {
                for (offsetCol = 0; offsetCol < playground[0].length; offsetCol++) {
                    playground[offsetRow][offsetCol] = playground[offsetRow - 1][offsetCol];
                }
            }

            // Increase score
            score += 50
        } else {
            row--;
        }
    }

    // Switch tetraminos
    tetramino = nameToTetramino(nextTetraminoName);
    getNextTetramino();

    // Increase score
    score += 10;

    // Change score
    currentScore.innerHTML = "Счет: " + score;
}