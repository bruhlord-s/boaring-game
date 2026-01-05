import { useGameStore } from '../stores/gameStore'

/** Нужно ли пропускать ввод */
export const shouldSkip = (curVal, isDelete) => {
  const game = useGameStore()

  const isValidSpace = validateIsSpaceNotInEndOfWord(game, curVal, isDelete)

  console.log(`Is invalid space: ${isValidSpace}`)

  return isValidSpace
}

/** Проверяет является ли введенный символ пробелом в конце строки */
const validateIsSpaceNotInEndOfWord = (game, curVal, isDelete) => {
  if (isDelete) {
    return false
  }

  const isSpace = curVal[curVal.length - 1] === ' '

  if (!isSpace) {
    return false
  }

  const currentTypedWord = game.typedTextTokens[game.currentTokenIndex]

  return !currentTypedWord || currentTypedWord.length < game.currentToken.length
}
