import { useGameStore } from '../stores/gameStore'

export const processSpaceInput = (input) => {
  const game = useGameStore()

  if (!game.currentTypeWord) {
    return
  }

  if (game.currentTypeWord.length >= game.currentToken.length) {
    game.currentTokenIndex++
    game.currentToken = game.textTokens[game.currentTokenIndex]
    game.currentTypeIndex = 0
    game.typedTextTokens = game.typedText.split(' ')
    game.typedText = input
  }
}
