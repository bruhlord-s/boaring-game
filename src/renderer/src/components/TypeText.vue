<script setup>
import { useGameStore } from '../stores/gameStore'
import { onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import TypeLetter from './TypeLetter.vue'

const game = useGameStore()

const input = useTemplateRef('textInput')

onMounted(() => {
  document.addEventListener('keyup', (e) => handleKeyup(e))
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', (e) => handleKeyup(e))
})

const handleKeyup = (e) => {
  e.preventDefault()

  if (game.isPreGame && e.key === 'Enter') {
    game.isPreGame = false
    input.value.focus()

    game.setupText()
  }
}
</script>

<template>
  <div class="type-text">
    <input
      ref="textInput"
      v-model="game.typedText"
      type="text"
      class="game-input"
      @focusout="input.focus()"
    />

    <div class="typed-text" :v-show="false">{{ game.typedText }}</div>
    <div class="text-wrapper">
      <div v-if="game.isPreGame" class="pre-game">
        <span>КАБАН ожидает ваших действий</span>
        <span>Нажмите <b>[Enter]</b> когда будете готовы сразиться с КАБАНОМ</span>
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
