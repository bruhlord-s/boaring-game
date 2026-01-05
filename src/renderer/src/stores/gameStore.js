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

  const textToType = ref('')
  const textTokens = ref([])
  const currentToken = ref('')
  const currentTokenIndex = ref(0)
  const typedText = ref('test')

  const gameStarted = ref(false)
  const startGame = () => {
    gameStarted.value = true
  }

  const setupText = (text) => {
    textTokens.value = text.split(' ')
    currentTokenIndex.value = 0
    currentToken.value = textTokens.value[currentTokenIndex]
  }

  watch(typedText, () => {
    if (typedText.value === currentToken.value) {
      currentTokenIndex.value++
      currentToken.value = textTokens.value[currentTokenIndex.value]
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
    gameStarted,

    setupText,
    startGame
  }
})
