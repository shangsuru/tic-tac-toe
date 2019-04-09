let fields = document.querySelectorAll('td')
let numberOfTurns = 0

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
    if (isGameFinished()) {
      setTimeout(newGame, 1000)
    } else {
      setTimeout(computerMove, 500)
    }
  })
})

// Let the computer make its move and check if game terminated.
function computerMove() {
  numberOfTurns++

  // choose random empty field and put a mark on it
  let emptyFields = getEmptyFields()
  let randomIndex = Math.floor(Math.random()* emptyFields.length)
  emptyFields[randomIndex].innerHTML = '<i class="far fa-circle fa-4x"></i>'

  if (isGameFinished()) {
    setTimeout(newGame, 1000)
  }
}

function getEmptyFields() {
  let emptyFields =  []
  for (let field of fields) {
    if (field.innerHTML === '') {
      emptyFields.push(field)
    }
  }
  return emptyFields
}

/* Returns true if there is a mark on each field or if
 * there are three equal marks in a row, column or diagonal.
 */
function isGameFinished() {
  // rows
  if (fields[0].innerHTML !== '' && fields[0].innerHTML === fields[1].innerHTML && fields[1].innerHTML === fields[2].innerHTML) {
    fields[0].style.background = '#8b0000'
    fields[1].style.background = '#8b0000'
    fields[2].style.background = '#8b0000'
    return true
  }
  if (fields[3].innerHTML !== '' && fields[3].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[5].innerHTML) {
    fields[3].style.background = '#8b0000'
    fields[4].style.background = '#8b0000'
    fields[5].style.background = '#8b0000'
    return true
  }
  if (fields[6].innerHTML !== '' && fields[6].innerHTML === fields[7].innerHTML && fields[7].innerHTML === fields[8].innerHTML) {
    fields[6].style.background = '#8b0000'
    fields[7].style.background = '#8b0000'
    fields[8].style.background = '#8b0000'
    return true
  }
  // columns
  if (fields[0].innerHTML !== '' && fields[0].innerHTML === fields[3].innerHTML && fields[3].innerHTML === fields[6].innerHTML) {
    fields[0].style.background = '#8b0000'
    fields[3].style.background = '#8b0000'
    fields[6].style.background = '#8b0000'
    return true
  }
  if (fields[1].innerHTML !== '' && fields[1].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[7].innerHTML) {
    fields[1].style.background = '#8b0000'
    fields[4].style.background = '#8b0000'
    fields[7].style.background = '#8b0000'
    return true
  }
  if (fields[2].innerHTML !== '' && fields[2].innerHTML === fields[5].innerHTML && fields[5].innerHTML === fields[8].innerHTML) {
    fields[2].style.background = '#8b0000'
    fields[5].style.background = '#8b0000'
    fields[8].style.background = '#8b0000'
    return true
  }
  // diagonals
  if (fields[0].innerHTML !== '' && fields[0].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[8].innerHTML) {
    fields[0].style.background = '#8b0000'
    fields[4].style.background = '#8b0000'
    fields[8].style.background = '#8b0000'
    return true
  }
  if (fields[2].innerHTML !== '' && fields[2].innerHTML === fields[4].innerHTML && fields[4].innerHTML === fields[6].innerHTML) {
    fields[2].style.background = '#8b0000'
    fields[4].style.background = '#8b0000'
    fields[6].style.background = '#8b0000'
    return true
  }

  if (numberOfTurns === 9) {
    return true
  }

  return false
}

/*
 * Resets all variables to their initial state, 
 * removes all marks from the grid and 
 * arbitrarily determines a starting player.
 */
function newGame() {
  numberOfTurns = 0

  fields.forEach(function (elem) { 
    elem.innerHTML = ''
    elem.style.background = '#181818'
  })

  if (Math.floor(Math.random() * 2) == 0) {
    setTimeout(computerMove, 500)
  }
}

newGame()
