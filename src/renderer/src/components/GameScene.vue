<script setup>
import EnemyScreen from './EnemyScreen.vue'
import Healthbar from './Healthbar.vue'
import TypeText from './TypeText.vue'
</script>

<template>
  <div class="game-scene">
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
