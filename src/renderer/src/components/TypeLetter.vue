<script setup>
  import { useGameStore } from '../stores/gameStore'
  import { computed, ref, watch } from 'vue'
  import { getIncorrectIndexes } from '../functions/wordCompare'

  const props = defineProps(['index'])

  const game = useGameStore()

  const typedWord = ref(game.typedTextTokens[props.index])
  const word = game.textTokens[props.index]
  const renderWord = computed(() => {
    return word + (typedWord.value?.slice(word.length, typedWord.length) ?? '')
  })

  const incorrectIndexes = computed(() => {
    return getIncorrectIndexes(typedWord.value, word)
  })

  watch(() => game.typedText, () => {
    typedWord.value = game.typedTextTokens[props.index]
  })
</script>

<template>
  <span
    v-for="(letter, letterIndex) in renderWord.split('')"
    class="word-letter"
    :class="{
      current: letterIndex === game.currentTypeIndex && index === game.currentTokenIndex,
      incorrect: incorrectIndexes.includes(letterIndex) || letterIndex > word.length,
      correct: !incorrectIndexes.includes(letterIndex) && (letterIndex < game.currentTypeIndex || index < game.currentTokenIndex)
    }"
  >
    {{ letter }}
  </span>
</template>

<style scoped>
  .word-letter.current {
    color: red
  }

  .word-letter.incorrect {
    color: orange;
  }

  .word-letter.correct {
    color: green;
  }
</style>
