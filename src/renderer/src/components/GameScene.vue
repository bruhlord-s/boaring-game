<script setup>
import { computed } from 'vue'
import EnemyScreen from './EnemyScreen.vue'
import Healthbar from './Healthbar.vue'
import TypeText from './TypeText.vue'
import { useGameStore } from '../stores/gameStore'

const game = useGameStore()

const bgColor = computed(() => {
  if (game.playerCloseToDeath) {
    return '#ff5c5c1a'
  }

  return 'transparent'
})
</script>

<template>
  <div class="game-scene" :style="{ backgroundColor: bgColor }">
    <EnemyScreen />
    <TypeText />
    <Healthbar />
  </div>
</template>

<style scoped>
.game-scene {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}
</style>
