<script setup>
  import { useGameStore } from '../stores/gameStore'
  import { onMounted, useTemplateRef } from 'vue'

  const game = useGameStore()
  const input = useTemplateRef('textInput')

  onMounted(() => {
    input.value.focus()
  })
</script>

<template>
  <div class="type-text">
    <input
      ref="textInput"
      v-model="game.typedText"
      type="text"
      class="game-input"
      @focusout="input.focus()"
    >

    <div>{{ game.typedText }}</div>
    <div class="text-wrapper">
      <span class="word" v-for="(word, index) in game.textTokens">
        <span v-if="index !== game.currentTokenIndex">{{ word }}</span>
        <span v-else>
          <span
            v-for="letter in word.split('')"
            class="word-letter"
          >
            {{ letter }}
          </span>
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
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
</style>
