import { useGameStore } from '../stores/gameStore'
import { damageEnemy } from './damageEnemy'

export const processSpaceInput = (input) => {
  const game = useGameStore()

  if (!game.currentTypeWord) {
    return
  }

  if (game.currentTypeWord.length >= game.currentToken.length) {
    if (game.wordIsCorrect(game.currentTokenIndex)) {
      damageEnemy(game.currentToken.length)
    }

    game.currentTokenIndex++
    game.currentToken = game.textTokens[game.currentTokenIndex]
    game.currentTypeIndex = 0
    game.typedTextTokens = game.typedText.split(' ')
    game.typedText = input
  }
}
