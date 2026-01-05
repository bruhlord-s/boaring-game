<script setup>
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

const game = useGameStore()

const health = computed(() => {
  return `${(game.player.currentHealth / game.player.maxHealth) * 100}%`
})
</script>

<template>
  <div class="healthbar">
    <div class="healthbar__inner" :style="{ width: health }"></div>
  </div>
</template>

<style scoped>
.healthbar {
  width: 1000px;
  height: 40px;
  border: 4px solid #006607;
  background-color: #303030;
}

.healthbar__inner {
  background: linear-gradient(#00af2f, #006b2c);
  height: 32px;
}
</style>
