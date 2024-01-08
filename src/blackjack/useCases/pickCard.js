/**
 * Function allows to pick a card from a deck
 * @param {Array<String>} currentDeck
 * @returns {String}
 */
function pickCard(currentDeck) {
  if (currentDeck.length < 1 || !currentDeck) {
    throw 'There is no cards left'
  }
  return currentDeck.pop()
}

export default pickCard
