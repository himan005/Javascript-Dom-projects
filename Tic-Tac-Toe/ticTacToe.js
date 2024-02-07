const BOARD_WIDTH = 3
let currentPlayer = 1
let moves = 0
let boardState = generateEmptyBoardState()

const gameSquares = document.querySelectorAll('.game-square');
const gameHeading = document.getElementById('game-heading');
const restartButton = document.getElementById('restart-button')


gameSquares.forEach((gameSquare, i) =>{
    gameSquare.addEventListener('click', () =>{
        console.log("index", i)
        const row = Math.floor(i/BOARD_WIDTH)
        const col = i%BOARD_WIDTH
        console.log(`Row:${row} Col:${col} GameSquare:${gameSquare}`)
        makeMove(gameSquare, row, col)
    })
})

restartButton.addEventListener('click', restartGame)

function makeMove(gameSquare, row, col){
    gameSquare.textContent = currentPlayer === 1 ? 'X' : 'O';
    gameSquare.disabled =true;
    moves++ 
    boardState[row][col] = currentPlayer
    if(checkPlayerWon(currentPlayer)){
        gameHeading.textContent = `Player ${currentPlayer} Won`
        endGame()
    } else if(moves >= BOARD_WIDTH * BOARD_WIDTH) {
        gameHeading.textContent = 'Game Draw';
        endGame()
    } else {
        currentPlayer = currentPlayer === 1 ? 2: 1;
        setCurrentPlayerHeader()
    }
}

function setCurrentPlayerHeader(){
    console.log("Heading execute")
    gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkPlayerWon(currentPlayer){
    
    const rows = [0,1,2]
    const wonHorizontal = rows.some(row =>{
        return(
            boardState[row][0] === currentPlayer &&
            boardState[row][1] === currentPlayer &&
            boardState[row][2] === currentPlayer 
        )
    })

    const cols = [0,1,2]
    const wonVertical = cols.some(col =>{
        return(
            boardState[0][col] === currentPlayer &&
            boardState[1][col] === currentPlayer &&
            boardState[2][col] === currentPlayer 
        )
    })

    const wonTopLeftToBottomRight = (
        boardState[0][0] === currentPlayer &&
        boardState[1][1] === currentPlayer &&
        boardState[2][2] === currentPlayer 
    )

    const wonTopRightToBottomLeft = (
        boardState[0][2] === currentPlayer &&
        boardState[1][1] === currentPlayer &&
        boardState[2][0] === currentPlayer 
    )

    return (
        wonHorizontal || wonVertical || wonTopLeftToBottomRight || wonTopRightToBottomLeft
    )
}

function endGame(){
    restartButton.style.display = 'block'
    gameSquares.forEach(gameSquare =>{
        gameSquare.disabled = true
    })
}

function generateEmptyBoardState(){
    return new Array(BOARD_WIDTH).fill().map(() => new Array(BOARD_WIDTH).fill())
}

function restartGame(){
    boardState = generateEmptyBoardState()
    currentPlayer = 1
    moves = 0
    setCurrentPlayerHeader()
    gameSquares.forEach(gameSquare =>{
        gameSquare.textContent = ''
        gameSquare.disabled = false
    })
    restartButton.style.display =' none'
}