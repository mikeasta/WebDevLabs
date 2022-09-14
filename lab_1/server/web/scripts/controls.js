// Event handlers
const rotateEvent = () => {
    const matrix = rotateTetramino(tetramino.matrix)
    if (isValidMove(matrix, tetramino.row, tetramino.col)) tetramino.matrix = matrix;
}


const moveRightEvent = () => {
    const columnToMove = tetramino.col + 1;
    if (isValidMove(tetramino.matrix, tetramino.row, columnToMove)) tetramino.col = columnToMove;
}


const moveLeftEvent = () => {
    const columnToMove = tetramino.col - 1;
    if (isValidMove(tetramino.matrix, tetramino.row, columnToMove)) tetramino.col = columnToMove;
}


const fallDownEvent = () => {
    let currRow = tetramino.row;

    while (true) {
        currRow++;
        if (!isValidMove(tetramino.matrix, currRow, tetramino.col)) {
            placeTetramino();
            return;
        }
        tetramino.row = currRow;
    }
}


const stepDownEvent = () => {
    const currRow = tetramino.row + 1;
    if (!isValidMove(tetramino.matrix, currRow, tetramino.col)) {
        placeTetramino();
        return;
    }
    tetramino.row = currRow
}


// Controls
document.addEventListener("keydown", (e) => {
    // Check if game is over
    if (gameOver) return;

    // Code of the pressed key (common for upper- and lowercase)
    const keyCode = e.code;

    switch (keyCode){
        case "KeyA": moveLeftEvent();  break;
        case "KeyD": moveRightEvent(); break;
        case "KeyW": rotateEvent();    break;
        case "KeyS": fallDownEvent();  break; 
    }

    drawTetris()
});