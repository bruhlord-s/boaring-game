<script setup>

import MainMenu from './components/MainMenu.vue'
import { useGameStore } from './stores/gameStore'
import GameScene from './components/GameScene.vue'

const game = useGameStore()
</script>

<template>
  <GameScene v-if="game.gameStarted" />
  <MainMenu v-else />
</template>

<style scoped>

</style>
