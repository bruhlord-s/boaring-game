<script setup>
  import { useGameStore } from '../stores/gameStore'

  const game = useGameStore()

  const onStart = () => {
    game.setupText('Тестирование старта игры нужно будет переделать')
    game.startGame()
  }
</script>

<template>
  <div class="buttons-wrapper">
    <button @click="onStart">Начать игру</button>
  </div>
</template>

<style scoped>

</style>
