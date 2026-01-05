<script setup>
import { useGameStore } from '../stores/gameStore'
import { onBeforeUnmount, onMounted, ref, useTemplateRef, watch } from 'vue'
import TypeLetter from './TypeLetter.vue'

const game = useGameStore()
const text = ref('')

const input = useTemplateRef('textInput')

watch(
  () => game.typedText,
  () => {
    text.value = game.typedText
  }
)

onMounted(() => {
  text.value = game.typedText

  document.addEventListener('keyup', handleKeyup)
  input.value.addEventListener('keydown', disableArrows)
})

onBeforeUnmount(() => {
  console.error('Unmounted')
  document.removeEventListener('keyup', handleKeyup)
  input.value.removeEventListener('keydown', disableArrows)
})

const handleKeyup = (e) => {
  e.preventDefault()

  if (game.isGameOver && e.key === 'Enter') {
    game.endGame()

    return
  }

  if (game.isRoundWon && e.key === 'Enter') {
    game.nextRound()

    return
  }

  if (game.isPreGame && e.key === 'Enter') {
    game.startGame()
    input.value.focus()
  }
}

const disableArrows = (e) => {
  if (
    e.key === 'ArrowLeft' ||
    e.key === 'ArrowRight' ||
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown' ||
    e.key === 'Home' ||
    e.key === 'End'
  ) {
    e.preventDefault()
  }
}

const handleChangeInput = () => {
  game.handleInput(text.value)
  text.value = game.typedText
}
</script>

<template>
  <div class="type-text">
    <input
      ref="textInput"
      v-model="text"
      type="text"
      class="game-input"
      @focusout="input.focus()"
      @input="handleChangeInput"
    />

    <div class="typed-text" :v-show="false">{{ game.typedText }}</div>
    <div class="text-wrapper">
      <div v-if="game.isPreGame" class="pre-game">
        <span>КАБАН ожидает ваших действий</span>
        <span>Нажмите <b>[Enter]</b> когда будете готовы сразиться с КАБАНОМ</span>
      </div>

      <div v-else-if="game.isGameOver" class="pre-game">
        <span>Вас ЗАКАБАНИЛИ и растоптали</span>
        <span>Нажмите <b>[Enter]</b> чтобы вернуться домой</span>
      </div>

      <div v-else-if="game.isRoundWon" class="pre-game">
        <span>КАБАН повержен</span>
        <span>Нажмите <b>[Enter]</b> чтобы пройти дальше</span>
      </div>

      <div v-else>
        <span class="word" v-for="(word, index) in game.textTokens">
          <span
            class="correct-word"
            v-if="index < game.currentTokenIndex && word === game.typedTextTokens[index]"
          >
            {{ game.typedTextTokens[index] }}
          </span>
          <span v-else-if="index > game.currentTokenIndex">{{ word }}</span>
          <span v-else>
            <TypeLetter :index />
          </span>
          <span>&nbsp;</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.type-text {
  width: 1000px;
  word-wrap: break-word;
  line-height: 1.4;
  padding: 32px 56px;
  background-color: #111111;
  border: 1px solid #6d6d6d;
}

.typed-text {
  display: none;
}

.text-wrapper {
  font-family: 'Roboto Mono';
  font-size: 24px;
  color: #555454;
}

.text-wrapper .pre-game {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.text-wrapper .pre-game b {
  color: #fff;
}

.game-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
  background: transparent;
  border: none;
  color: transparent;
  caret-color: transparent; /* Скрыть курсор */
  z-index: 10;
}

.correct-word {
  color: #fff;
}
</style>
