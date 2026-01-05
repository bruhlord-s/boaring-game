import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { shouldSkip } from '../functions/shouldSkip'
import { processSpaceInput } from '../functions/processSpace'
import { processDelete } from '../functions/processDelete'

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

  const isPreGame = ref(false)

  const currentLevel = ref(1)

  const gameStarted = ref(false)
  const startGame = () => {
    gameStarted.value = true
  }

  const texts = [
    'Дикие кабаны это удивительные животные. Они очень сильны и выносливы. Их тело покрыто густой щетиной. У самцов есть опасные клыки. Кабаны живут в лесах и зарослях. Они активны в основном ночью. Питаются кабаны всем подряд. Они едят коренья и жёлуди. Ловят насекомых и мелких грызунов. Не брезгуют грибами и ягодами. Кабаны любят валяться в грязи. Это их способ охладиться и избавиться от паразитов. У кабанов крепкие семьи. Самки с поросятами ходят стадом. Взрослые самцы живут отдельно. Эти звери очень умны и осторожны.'
  ]

  const setupText = () => {
    textTokens.value = texts[currentLevel.value - 1].split(' ')
    currentTokenIndex.value = 0
    currentToken.value = textTokens.value[currentTokenIndex.value]
    currentTypeIndex.value = 0
  }

  /** По индексу слова возвращает верно ли оно было введено */
  const wordIsCorrect = (wordIndex) => {
    if (wordIndex < 0) {
      return false
    }

    return typedTextTokens.value[wordIndex] === textTokens.value[wordIndex]
  }

  const handleInput = (input) => {
    console.log(`Handle input: ${input}`)

    const isSpace = input[input.length - 1] === ' '
    const isDelete = typedText.value.length > input.length
    console.log(`Is delete: ${isDelete}`)
    console.log(`Typed text: ${typedText.value}`)

    if (shouldSkip(input, isDelete)) {
      return
    }

    if (!isDelete && isSpace) {
      processSpaceInput(input)
      return
    }

    if (isDelete) {
      processDelete(input)
      return
    }

    typedText.value = input
    typedTextTokens.value = typedText.value.split(' ')

    currentTypeIndex.value++
  }

  const currentTypeWord = computed(() => typedTextTokens.value[currentTokenIndex.value])

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
    currentTypeWord,
    gameStarted,
    isPreGame,

    setupText,
    startGame,
    handleInput,
    wordIsCorrect
  }
})
