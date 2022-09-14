// Draw playground
const playgroundCanvas = document.getElementById("playground")
const playgroundContext = playgroundCanvas.getContext('2d')

playgroundCanvas.width  = 320
playgroundCanvas.height = 640

const nextShapeCanvas = document.getElementById("next_shape")
const nextShapeContext = nextShapeCanvas.getContext('2d')

nextShapeCanvas.width  = 128
nextShapeCanvas.height = 128

// Grid size (px)
const gridSize = 32

// Draw next shape
const drawNext = () => {
    // Clear canvas
    nextShapeContext.clearRect(0, 0, nextShapeCanvas.width, nextShapeCanvas.height);

    // Draw next shape
    if (nextTetraminoName) {
        nextShapeContext.fillStyle = colors[nextTetraminoName]
        const matrix = tetraminos[nextTetraminoName]

        // For centring the next shape
        let increment;
        switch(matrix.length) {
            case 4: increment = 0; break;
            case 3: increment = gridSize/2; break;
            case 2: increment = gridSize; break;
        }

        for (let row = 0; row < matrix.length; row++) {
            for (let col = 0; col < matrix[0].length; col++) {
                if (matrix[row][col]) {
                    nextShapeContext.fillRect(col * gridSize +  increment, row * gridSize + increment, gridSize - 1, gridSize - 1);
                }
            }
        }
    }
}


// Draw playground
const drawTetris = () => {
    // Clear canvas
    playgroundContext.clearRect(0, 0, playgroundCanvas.width, playgroundCanvas.height);

    // Draw playground 
    for (let row = 0; row < playground.length; row++) {
        for (let col = 0; col < playground[0].length; col++) {
            const name = playground[row][col]
            if (name) {
                playgroundContext.fillStyle = colors[name];
                playgroundContext.fillRect(col * gridSize, row * gridSize, gridSize - 1, gridSize - 1);
            }
        }
    }

    // Draw tetramino
    if (tetramino) {
        playgroundContext.fillStyle = colors[tetramino.name]

        for (let row = 0; row < tetramino.matrix.length; row++) {
            for (let col = 0; col < tetramino.matrix[0].length; col++) {
                if (tetramino.matrix[row][col]) {
                    playgroundContext.fillRect((tetramino.col + col) * gridSize, (tetramino.row + row) * gridSize, gridSize - 1, gridSize - 1);
                }
            }
        }
    }

    // Draw next
    drawNext()
}

