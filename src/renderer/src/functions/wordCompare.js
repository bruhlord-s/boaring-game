export const getIncorrectIndexes = (typedText, currentToken) => {
  const result = []

  if (!typedText) {
    return result
  }

  for (let i = 0; i < typedText.length; i++) {
    const typedLetter = typedText[i]
    const shouldTyped = currentToken[i]

    if (typedLetter !== shouldTyped) {
      result.push(i)
    }
  }

  return result
}
