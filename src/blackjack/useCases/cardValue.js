/**
 * Function asigns a value to a string
 * @param {String} card example: '9H'
 * @returns {Number} example: 9
 */
function cardValue(card) {
  const value = card.substring(0, card.length - 1)
  return isNaN(value) ? (value === 'A' ? 11 : 10) : Number(value)
}

export default cardValue
