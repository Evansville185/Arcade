let restart = document.getElementById('restartBtn');
let startBtn = document.getElementById('startBtn');
const boxes = Array.from(document.getElementsByClassName('box'));
const board = document.getElementById('board');
let winnerMsg = document.getElementById('#winningMsg');
const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const X_player = 'X';
const O_player = 'O';
let playerX = document.getElementById('playerX');
let playerO = document.getElementById('playerO');

let playerTurn = false;
let currentPlayer = '';
let players = [X_player, O_player]
let user = '';
board.style.visibility = 'hidden';
board.style.height = 0;
//--------------------------------------------------------------------

//random player generator
function random() {
    let randomIndex = Math.floor(Math.random() * players.length);
    currentPlayer = players[randomIndex];
    console.log(currentPlayer);
}


startBtn.addEventListener('click', () => {

    if(playerX.value.length == 0) {
        alert("Please fill out Player X");
        return false;
    } else if(playerO.value.length == 0) {
        alert("Please fill out Player O");
        return false;
    } else {
        startGame()
    }
});

function startGame() {
    board.style.visibility = 'visible';
    board.style.height='450px';
    playerTurn = false;
    currentPlayer = playerTurn ? O_player : X_player;
    winningMsg.innerHTML = `${currentPlayer} goes first!`;

    //disables being able to click on the same box twice
boxes.forEach(box => { 
    box.addEventListener('click', onBoardClick, { once: true })
    });
}


function onBoardClick(e) {
    const boxes = e.target
    currentPlayer = playerTurn ? O_player : X_player;
    // indicates who's turn it is
    if(currentPlayer == O_player) {
        user = X_player;
    } else {
        user = O_player;
    }

    placeMark(boxes, currentPlayer)
    //check for win
    if (checkWin(currentPlayer)) {
        gameOver(true)
    //check for draw
    } else if (drawGame()) {
        gameOver(true);
    } else { //switch turns  
        switchTurns()
    }
}

//places mark on board
function placeMark(boxes, currentPlayer) {
    boxes.classList.add(boxes.innerHTML = currentPlayer);
    console.log(boxes);
}

//switches player turn
function switchTurns() {
    playerTurn = !playerTurn;
    currentPlayer = playerTurn ? O_player : X_player;
    winningMsg.innerHTML = `It's ${user} turn.`;
}

//check for winning combo
function checkWin(currentPlayer) {
    return winningCombo.some(combination => {
        return combination.every(index => {
            return boxes[index].classList.contains(currentPlayer)
        })
    })
}

//game is a draw or winning combo
function gameOver() {
    if (drawGame(true)) {
        winningMsg.innerHTML = `It's A Draw!`
    } else {
        if(currentPlayer == X_player) {
            currentPlayer = playerX.value;
        } else {
            currentPlayer = playerO.value;
        }
        winningMsg.innerHTML = `${currentPlayer} Has Won!`;
    }

}

//checks if no winning combo is present and all boxes are filled
function drawGame() {
    return boxes.every(box => {
        return box.classList.contains(O_player) || box.classList.contains(X_player);
    })
}

//restart button
restart.addEventListener('click', function() {
    restartGame();
});

//removes placemarkers on board and removes texts
function restartGame() {
    boxes.forEach(box => {
        box.innerText = '';
        box.className = 'box';
    })
    board.style.visibility = 'hidden';
    board.style.height= 0;
    winningMsg.innerHTML = '';
    playerX.value = '';
    playerO.value = '';
}