// * DOM-ELEMENTS IMPORTS
// Form elements
const nicknameInput      = document.getElementById("nickname_input")
const nicknameButton     = document.getElementById("nickname_btn")
const leaderboardsButton = document.getElementById("leaderboards_btn")
const leaderboardsCloseButton = document.getElementById("leaderboards_close_button")
const backToMenuButton = document.getElementById("back_to_menu")


// Containers
const mainMenuWrapper = document.getElementById("main_menu_wrapper")
const leaderboardsWrapper = document.getElementById("leaderboards_wrapper")
const leaderboardsTableBody = document.getElementById("leaderboards_table_body")
const gameplayWrapper = document.getElementById("gameplay_wrapper")


// Text boxes
const playerNickname = document.getElementById("players_nickname")
const currentLevel = document.getElementById("current_level")
const currentScore = document.getElementById("current_score")


// * UTILS
const addLeaderboardsNote = (name, score) => {
    let buf = JSON.parse(localStorage["tetris.leaderboards"])
    buf[name] = score;
    localStorage["tetris.leaderboards"] = JSON.stringify(buf)
}


// * MAIN MENU SETUP
// Check if there are any already written nickname
if (localStorage["tetris.nickname"]) {
    nicknameInput.value = localStorage["tetris.nickname"]
}


// "Play" button 
nicknameButton.addEventListener("click", () => {
    // Clear canvases
    nextShapeContext.clearRect(0, 0, nextShapeCanvas.width, nextShapeCanvas.height);
    playgroundContext.clearRect(0, 0, playgroundCanvas.width, playgroundCanvas.height);

    // Save nickname
    enteredNickname = nicknameInput.value
    processedNickname = enteredNickname.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()!?]/g,"")

    let leaderboardsDatabase = JSON.parse(localStorage["tetris.leaderboards"])

    // Check if nickname is empty or incorrect
    if (!enteredNickname || processedNickname != enteredNickname ) {
        alert("Please enter correct name!")
        return
    }

    // Check if nickname is exsists
    if (leaderboardsDatabase[enteredNickname]) {
        alert("Please enter unique name!")
        return
    }

    localStorage["tetris.nickname"] = enteredNickname

    
    // Hide main menu and open gameplay screen
    mainMenuWrapper.style.display = "none"
    gameplayWrapper.style.display = "flex"

    // Player nickname demo
    playerNickname.innerHTML = "Игрок " + enteredNickname
    currentLevel.innerHTML   = "Текущий уровень: 1"
    currentScore.innerHTML   = "Счет: 0"
    
    // Start game 
    startGame()
})


// "Leaderboards" button
leaderboardsButton.addEventListener("click", () => {
    // Clear previous nodes
    leaderboardsTableBody.innerHTML = ""
    
    // Load local data 
    let leaderboardsDB = JSON.parse(localStorage["tetris.leaderboards"])

    // Sort data
    let leaderboardsDBArray = []
    for (let key in leaderboardsDB) {
        leaderboardsDBArray.push([key, leaderboardsDB[key]])
    }

    leaderboardsDBArray.sort((a, b) => {
        return b[1] - a[1];
    })
        

    leaderboardsDBArray.forEach( pair => {
        const nameField  = document.createElement("td")
        const scoreField = document.createElement("td")
        const row        = document.createElement("tr")

        let name = pair[0]
        nameField.innerText  = name
        scoreField.innerText = leaderboardsDB[name]

        row.appendChild(nameField)
        row.appendChild(scoreField)
        leaderboardsTableBody.appendChild(row)
    })

    // Open leaderboards
    leaderboardsWrapper.style.display = "flex"
})


// "Close" leaderboards button
leaderboardsCloseButton.addEventListener("click", () => {
    // Close leaderboards
    leaderboardsWrapper.style.display = "none"
})


// "Go to menu" button
backToMenuButton.addEventListener("click", () => {
    // Stop current game, save score
    gameOver = true;

    // Close game
    gameplayWrapper.style.display = "none"

    // Open menu
    mainMenuWrapper.style.display = "flex"
})