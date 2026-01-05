import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useGameStore = defineStore('game-store', () => {
  const boar = ref({
    maxHealth: 10,
    currentHealth: 10
  })

  const player = ref({
    maxHealth: 10,
    currentHealth: 10
  })

  /** Текст для ввода */
  const textToType = ref('')
  /** Массив слов из текста */
  const textTokens = ref([])
  /** Текущее слово */
  const currentToken = ref('')
  /** Индекс слова из всего текста */
  const currentTokenIndex = ref(0)
  /** Текущая введенная часть слова */
  const typedText = ref('')
  /** Массив веденных слов */
  const typedTextTokens = ref([''])
  /** Индекс позиции каретки */
  const currentTypeIndex = ref(0)

  const gameStarted = ref(false)
  const startGame = () => {
    gameStarted.value = true
  }

  const setupText = (text) => {
    textTokens.value = text.split(' ')
    currentTokenIndex.value = 0
    currentToken.value = textTokens.value[currentTokenIndex.value]
    currentTypeIndex.value = 0
  }

  // По сути основной метод отслеживания позиции, можно сделать не вотчером а вызовом метода в теории
  watch(typedText, (cur, prev) => {
    const isSpace = cur[cur.length - 1] === ' '
    const isDelete = prev.length > cur.length

    // Если это не удаление, то можно проверять корректность слова через getIncorrectIndexes и наносить урон

    // Если пробел пытаются поставить в середине слова, то нужно это игнорировать
    if (isSpace && typedText.value.length < currentToken.value.length) {
      typedText.value = prev
      return
    }

    // Переход к следующему слову после нажатия на пробел
    if (isSpace && typedText.value.length >= currentToken.value.length && !isDelete) {
      // Здесь можно проверять корректность слова и наносить урон
      currentTokenIndex.value++
      currentToken.value = textTokens.value[currentTokenIndex.value]
      currentTypeIndex.value = 0
      typedTextTokens.value = typedText.value.split(' ')

      return
    }

    // Если это удаление и переход на прошлое слово, то нужно поменять индекс
    if (isDelete && prev[prev.length - 1] === ' ') {
      Math.max(currentTokenIndex.value--, 0)
      currentToken.value = textTokens.value[currentTokenIndex.value]
      currentTypeIndex.value = currentToken.value.length
      typedTextTokens.value = typedText.value.split(' ')
      return
    }

    typedTextTokens.value = typedText.value.split(' ')

    // Изменения индекса каретки
    if (!isDelete) {
      currentTypeIndex.value++
    } else {
      Math.max(currentTypeIndex.value--, 0)
    }
  })

  return {
    boar,
    player,
    textToType,
    textTokens,
    currentToken,
    currentTokenIndex,
    typedText,
    typedTextTokens,
    currentTypeIndex,
    gameStarted,

    setupText,
    startGame
  }
})
