import createDeck from './useCases/createDeck'
import pickCard from './useCases/pickCard'
import cardValue from './useCases/cardValue'
import { deckCards, deckTypes } from './useCases/cards'

;(() => {
  'use strict'

  let deck = []
  // Scores
  let playersPoints = []

  // DOM elements
  const playerScores = document.querySelectorAll('small')
  const playerWorkspace = document.querySelectorAll('.workspace')

  // turn 0 belongs to 1st player last turn belongs to PC
  function stackPoints(card, turn) {
    playersPoints[turn] += cardValue(card)
    playerScores[turn].innerHTML = playersPoints[turn]
  }

  // PC turn
  function pcTurn(lastPlayerPoints) {
    const pcIndex = playersPoints.length - 1
    do {
      const cardPicked = pickCard(deck)
      stackPoints(cardPicked, pcIndex)
      displayCard(cardPicked, playerWorkspace[pcIndex])
    } while (
      playersPoints[pcIndex] < lastPlayerPoints &&
      lastPlayerPoints <= 21
    )
    stopBtn.disabled = true
    winner()
  }

  // Event listeners
  // Draw
  const drawCardBtn = document.querySelector('#draw-card')

  // TODO the player 1 is fixed, change 0 for other players, 0 is player 1
  drawCardBtn.addEventListener('click', () => {
    const cardPicked = pickCard(deck)
    stackPoints(cardPicked, 0)
    displayCard(cardPicked, playerWorkspace[0])

    if (playersPoints[0] >= 21) {
      drawCardBtn.disabled = true
      pcTurn(playersPoints[0])
    }
  })

  // Stop
  const stopBtn = document.querySelector('#stop-player-turn')
  stopBtn.addEventListener('click', () => {
    drawCardBtn.disabled = true
    pcTurn(playersPoints[0])
  })

  // New game
  const newGame = document.querySelector('#new-game')
  newGame.addEventListener('click', () => {
    window.location.reload()
  })

  // Controls
  function startGame(numPlayers = 2) {
    deck = createDeck(deckTypes, deckCards)
    for (let i = 0; i < numPlayers; i++) {
      playersPoints.push(0)
    }
  }

  function winner() {
    if (playersPoints[0] === playersPoints[1]) {
      console.log('Its a tie')
    } else if (playersPoints[0] <= 21 && playersPoints[1] > 21) {
      console.log('You won')
    } else {
      console.log('PC won!')
    }
  }

  // UI
  // Display player score
  function displayPlayerScore(score, PointsUI) {
    PointsUI.innerText = score
  }

  // Display card
  function displayCard(card, workspace) {
    const img = document.createElement('img')
    img.src = `../assets/cards/${card}.png`
    img.alt = `${card} card`
    img.classList.add('card')
    workspace.appendChild(img)
  }

  startGame()
})()
