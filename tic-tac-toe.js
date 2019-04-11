let fields = document.querySelectorAll('td')
const WIN = 1
const DRAW = 0
const NOT_ENDED = -1
let compSymbol, playerSymbol, grid

newGame()

function newGame() {
  // reset DOM and grid
  fields.forEach(elem => {
    elem.innerHTML = ''
    elem.style.background = 'transparent';
  })
  grid = [null, null, null, null, null, null, null, null, null]

  // determine starting player and set symbols accordingly
  if (Math.floor(Math.random() * 2) == 0) {
    compSymbol = 'X'
    playerSymbol = 'O'
    setTimeout(computerMove, 500)
  } else {
    compSymbol = 'O'
    playerSymbol = 'X'
  }
}

/*
 * Places a mark on the field the player clicked on, if it's empty
 * and checks the win condition. If the game is finished, 
 * it starts a new game,
 * else the computer will make its move.
 */
fields.forEach(function (elem) {
  elem.addEventListener('click', function () {
    if (isPlayerTurn(grid)) {
      if (this.innerHTML === '') {
        grid[this.id] = playerSymbol
        drawBoard()
        if (getGameStatus(grid).result === NOT_ENDED) {
          setTimeout(computerMove, 500)
        } else {
          setTimeout(newGame, 1000)
        }
      }
    }
  })
})

// Returns true, if it's the human player's turn.
function isPlayerTurn(board) {
  let numberOfPlayerSymbols = 0
  let numberOfCompSymbols = 0
  for (let field of board) {
    if (field === playerSymbol) {
      numberOfPlayerSymbols++
    } else if (field === compSymbol) {
      numberOfCompSymbols++
    }
  }
  if (numberOfPlayerSymbols > numberOfCompSymbols) {
    return false
  } else {
    return true
  }
}

// Executes the AI's move.
function computerMove() {

  grid[minimax(grid, 0, false)] = compSymbol
  drawBoard()

  if (getGameStatus(grid).result !== NOT_ENDED) {
    setTimeout(newGame, 1000)
  }
}

// Minimax algorithm that calculates the best move for the given board position.
function minimax(board, depth, playerTurn) { 
  // recursion break: game has finished
  if (getGameStatus(board).result === WIN) { 
    if (playerTurn) {
      return depth - 10 // a win for the AI player is evaluated as negative
    } else {
      return 10 - depth // a win for the human player is evaluated positively
    }
  } else if (getGameStatus(board).result === DRAW) {
    return 0 // a draw is evaluated neutral
  } else {

    // determine the score for all possible moves
    const values = []
    let boardCopy = board.slice(0)
    for (let i = 0; i < boardCopy.length; i++) {
      if (boardCopy[i] === null) {
        boardCopy[i] = playerTurn ? playerSymbol : compSymbol
        const value = minimax(boardCopy, depth + 1, !playerTurn)
        values.push({
          cost: value,
          cell: i
        })
        boardCopy[i] = null;
      }
    }

    // the human player tries to maximize the score
    if (playerTurn) {
      let max = values[0]
      for (let i = 1; i < values.length; i++) {
        if (values[i].cost > max.cost) {
          max = values[i]
        }
      }
      if (depth == 0) {
        return max.cell
      } else {
        return max.cost
      }

    // the AI tries to minimize the score
    } else {
      let min = values[0]
      for (let i = 1; i < values.length; i++) {
        if (values[i].cost < min.cost) {
          min = values[i]
        }
      }
      if (depth == 0) {
        return min.cell
      } else {
        return min.cost
      }
    }
  }
}

/* 
 * Returns an object for the given board 
 * containing a constant that represents one of the possible game states 
 * WIN, DRAW, NOT_ENDED, and an array, that in case
 * of WIN contains the indices of the fields causing the win condition to
 * be fulfilled.
 */
function getGameStatus(board) {
  // rows
  if (board[0] !== null && board[0] === board[1] && board[1] === board[2]) {
    return { result: WIN, indices: [0, 1, 2] }
  }
  if (board[3] !== null && board[3] === board[4] && board[4] === board[5]) {
    return { result: WIN, indices: [3, 4, 5] }
  }
  if (board[6] !== null && board[6] === board[7] && board[7] === board[8]) {
    return { result: WIN, indices: [6, 7, 8] }
  }
  // columns
  if (board[0] !== null && board[0] === board[3] && board[3] === board[6]) {
    return { result: WIN, indices: [0, 3, 6] }
  }
  if (board[1] !== null && board[1] === board[4] && board[4] === board[7]) {
    return { result: WIN, indices: [1, 4, 7] }
  }
  if (board[2] !== null && board[2] === board[5] && board[5] === board[8]) {
    return { result: WIN, indices: [2, 5, 8] }
  }
  // diagonals
  if (board[0] !== null && board[0] === board[4] && board[4] === board[8]) {
    return { result: WIN, indices: [0, 4, 8] }
  }
  if (board[2] !== null && board[2] === board[4] && board[4] === board[6]) {
    return { result: WIN, indices: [2, 4, 6] }
  }

  // check if there are still empty fields in the grid
  for (let field of board) {
    if (field === null) {
      return { result: NOT_ENDED, indices: [] }
    }
  }
  return { result: DRAW, indices: [] }
}

function drawBoard() {
  // draw symbols on the DOM according to representation in the grid.
  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === 'X') {
      fields[i].innerHTML = '<i class="fas fa-times fa-5x"></i>'
    } else if (grid[i] === 'O') {
      fields[i].innerHTML = '<i class="far fa-circle fa-4x"></i>'
    }
  }
  // marks winning sequence
  getGameStatus(grid).indices.forEach(i => fields[i].style.background = '#990000')
}
