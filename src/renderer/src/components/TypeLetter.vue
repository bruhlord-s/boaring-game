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

watch(
  () => game.typedText,
  () => {
    typedWord.value = game.typedTextTokens[props.index]
  }
)
</script>

<template>
  <span
    v-for="(letter, letterIndex) in renderWord.split('')"
    class="word-letter"
    :class="{
      current: letterIndex === game.currentTypeIndex && index === game.currentTokenIndex,
      incorrect: incorrectIndexes.includes(letterIndex) || letterIndex > word.length,
      correct:
        !incorrectIndexes.includes(letterIndex) &&
        (letterIndex < game.currentTypeIndex || index < game.currentTokenIndex)
    }"
  >
    {{ letter }}
  </span>
</template>

<style scoped>
.word-letter {
  position: relative;
}

.word-letter.current::after {
  content: '';
  position: absolute;
  top: 0;
  left: -2px;
  width: 2px;
  height: 1.3em;
  background-color: currentColor;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0.6;
  }
}

.word-letter.incorrect {
  color: #f40000;
  text-decoration: underline;
}

.word-letter.correct {
  color: #ffffff;
}
</style>
