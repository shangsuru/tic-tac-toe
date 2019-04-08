let fields = document.querySelectorAll('td')
let numberOfTurns = 0
let gameTerminated = false

/* 
 * Places a mark on the field the player clicked on, if it's empty
 * and checks the win condition. If the game would end, it resets everything,
 * else the computer will make his move.
 */
fields.forEach(function (elem) {
  elem.addEventListener('click', function () {
    if (this.innerHTML === '') {
      numberOfTurns++
      this.innerHTML = '<i class="fas fa-times fa-5x"></i>'
    }

    checkWinCondition()
    if (gameTerminated || numberOfTurns === 9) {
      setTimeout(newGame, 1000)
    } else {
      setTimeout(computerMove, 500)
    }
  })
})

// let the computer make its move and check win condition afterwards
function computerMove() {
  numberOfTurns++

  // choose random field and put a mark on it
  let n = Math.floor(Math.random() * 9)
  while (fields[n].innerHTML !== '') {
    n = Math.floor(Math.random() * 9)
  }
  fields[n].innerHTML = '<i class="far fa-circle fa-4x"></i>'

  checkWinCondition()
  if (gameTerminated || numberOfTurns === 9) {
    setTimeout(newGame, 1000)
  }
}

/* Checks if there are three equal marks in a row column or diagonal
 * and if so, changes the background of
 * those to red and sets the gameTerminated flag to true.
 */
function checkWinCondition() {
  // rows
  if (fields[0].innerHTML !== '' && fields[0].innerHTML === fields[1].innerHTML && fields[1].innerHTML === fields[2].innerHTML) {
    fields[0].style.background = '#8b0000'
    fields[1].style.background = '#8b0000'
    fields[2].style.background = '#8b0000'
    gameTerminated = true
  }
  if (fields[3].innerHTML !== '' && fields[3].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[5].innerHTML) {
    fields[3].style.background = '#8b0000'
    fields[4].style.background = '#8b0000'
    fields[5].style.background = '#8b0000'
    gameTerminated = true
  }
  if (fields[6].innerHTML !== '' && fields[6].innerHTML === fields[7].innerHTML && fields[7].innerHTML === fields[8].innerHTML) {
    fields[6].style.background = '#8b0000'
    fields[7].style.background = '#8b0000'
    fields[8].style.background = '#8b0000'
    gameTerminated = true
  }
  // columns
  if (fields[0].innerHTML !== '' && fields[0].innerHTML === fields[3].innerHTML && fields[3].innerHTML === fields[6].innerHTML) {
    fields[0].style.background = '#8b0000'
    fields[3].style.background = '#8b0000'
    fields[6].style.background = '#8b0000'
    gameTerminated = true
  }
  if (fields[1].innerHTML !== '' && fields[1].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[7].innerHTML) {
    fields[1].style.background = '#8b0000'
    fields[4].style.background = '#8b0000'
    fields[7].style.background = '#8b0000'
    gameTerminated = true
  }
  if (fields[2].innerHTML !== '' && fields[2].innerHTML === fields[5].innerHTML && fields[5].innerHTML === fields[8].innerHTML) {
    fields[2].style.background = '#8b0000'
    fields[5].style.background = '#8b0000'
    fields[8].style.background = '#8b0000'
    gameTerminated = true
  }
  // diagonals
  if (fields[0].innerHTML !== '' && fields[0].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[8].innerHTML) {
    fields[0].style.background = '#8b0000'
    fields[4].style.background = '#8b0000'
    fields[8].style.background = '#8b0000'
    gameTerminated = true
  }
  if (fields[2].innerHTML !== '' && fields[2].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[6].innerHTML) {
    fields[2].style.background = '#8b0000'
    fields[4].style.background = '#8b0000'
    fields[6].style.background = '#8b0000'
    gameTerminated = true
  }
}

/*
 * Resets all variables to their initial state, 
 * removes all marks from the grid and 
 * arbitrarily determines a starting player.
 */
function newGame() {
  gameTerminated = false
  numberOfTurns = 0
  opponentsTurn = false

  fields.forEach(function (elem) { 
    elem.innerHTML = ''
    elem.style.background = '#181818'
  })

  if (Math.floor(Math.random() * 2) == 0) {
    setTimeout(computerMove, 500)
  }
}

newGame()
