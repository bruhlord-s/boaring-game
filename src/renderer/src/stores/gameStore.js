import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { shouldSkip } from '../functions/shouldSkip'
import { processSpaceInput } from '../functions/processSpace'
import { processDelete } from '../functions/processDelete'
import { damagePlayer } from '../functions/damagePlayer'
import { checkIfPlayerCloseToDeath, checkIfPlayerDead } from '../functions/playerChecks'
import { boarDeadSound } from '../functions/damageEnemy'
import { getIncorrectIndexes } from '../functions/wordCompare'

export const useGameStore = defineStore('game-store', () => {
  const boar = ref({
    maxHealth: 10,
    currentHealth: 10,
    isDead: false
  })

  const player = ref({
    maxHealth: 100,
    currentHealth: 100
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
  /** Состояние перед началом раунда (тум где ентер надо жмать) */
  const isPreGame = ref(false)
  /** Состояние поле поражения */
  const isGameOver = ref(false)
  /** Состояние победы в раунде */
  const isRoundWon = ref(false)
  /** Текущий уровень */
  const currentLevel = ref(1)
  /** Близок ли игрок к поражению */
  const playerCloseToDeath = ref(false)
  /** Интервал нанесения урона */
  const playerDamageInterval = ref()

  const gameStarted = ref(false)
  const startGame = () => {
    gameStarted.value = true
  }

  const endGame = () => {
    gameStarted.value = false
    boar.value.currentHealth = boar.value.maxHealth
    player.value.currentHealth = player.value.maxHealth

    isGameOver.value = false
    playerCloseToDeath.value = false

    if (playerDamageInterval.value) {
      clearInterval(playerDamageInterval.value)
      playerDamageInterval.value = undefined
    }
  }

  const endRound = () => {
    if (playerDamageInterval.value) {
      clearInterval(playerDamageInterval.value)
      playerDamageInterval.value = undefined
    }

    isRoundWon.value = true
  }

  const nextRound = () => {
    boar.value.currentHealth = boar.value.maxHealth
    boar.value.isDead = false

    player.value.currentHealth = player.value.maxHealth
    playerCloseToDeath.value = false

    isRoundWon.value = false

    startPlayerDamageInterval()
  }

  const startPlayerDamageInterval = () => {
    if (playerDamageInterval.value === undefined) {
      console.log('Created player damage interval')

      playerDamageInterval.value = setInterval(() => {
        damagePlayer(2)

        if (checkIfPlayerCloseToDeath()) {
          playerCloseToDeath.value = true
        }

        if (checkIfPlayerDead()) {
          isGameOver.value = true
        }
      }, 1000)
    }
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

  watch(isPreGame, () => {
    if (isPreGame.value === false) {
      startPlayerDamageInterval()
    }
  })

  watch(
    () => boar.value.currentHealth,
    () => {
      if (boar.value.currentHealth <= 0) {
        boar.value.isDead = true
        boarDeadSound.play()
        endRound()
      }
    }
  )

  const handleInput = (input) => {
    console.log(`Handle input: ${input}`)
    const startMistakes = getIncorrectIndexes(currentTypeWord.value, currentToken.value).length

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

    const endMistakes = getIncorrectIndexes(currentTypeWord.value, currentToken.value).length

    if (endMistakes - startMistakes > 0) {
      damagePlayer(2, true)
    }
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
    playerCloseToDeath,
    isGameOver,
    isRoundWon,

    nextRound,
    setupText,
    startGame,
    endGame,
    handleInput,
    wordIsCorrect
  }
})
