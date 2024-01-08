import _ from 'lodash'

/**
 * Allows to create a new random deck
 * @param {Array<String>} cardTypes example: ['C', 'D', 'H', 'S']
 * @param {Array<String>} cardsNumbers example: ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'A', 'J', 'Q', 'K']
 * @returns {Array<String>} Returns a new deck
 */
function createDeck(cardTypes, cardNumbers) {
  if (!cardTypes || cardTypes.length < 1)
    throw new Error('Card type argument is mandatory as an Array of strings')
  if (!cardNumbers || cardNumbers.length < 1)
    throw new Error('Card numbers argument is mandatory as an Array of strings')
  const deck = []

  cardTypes.forEach((item) => {
    cardNumbers.forEach((element) => {
      deck.push(`${element}${item}`)
    })
  })

  return _.shuffle(deck)
}

export default createDeck
