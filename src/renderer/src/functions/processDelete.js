import { useGameStore } from '../stores/gameStore'

export const processDelete = (input) => {
  const game = useGameStore()

  // Обработка перемещения к прошлому слову
  if (!game.currentTypeWord) {
    console.log('Process go to prev world')

    // Перемещаемся, только если в прошлом слове есть ошибка, чтобы не было абузов
    if (game.wordIsCorrect(game.currentTokenIndex - 1)) {
      console.warn('Prev word is correct! Cant go back')
      return
    }

    game.currentTokenIndex = Math.max(game.currentTokenIndex - 1, 0)
    game.currentToken = game.textTokens[game.currentTokenIndex]

    game.currentTypeIndex = game.typedTextTokens[game.currentTokenIndex].length
    game.typedText = input
    game.typedTextTokens = game.typedText.split(' ')

    return
  }

  game.currentTypeIndex = Math.max(game.currentTypeIndex - 1, 0)
  game.typedText = input
  game.typedTextTokens = game.typedText.split(' ')
}
