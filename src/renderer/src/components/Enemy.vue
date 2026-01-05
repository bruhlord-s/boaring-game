<script setup>
import { computed } from 'vue'
import brokenBoar from '../../assets/broken-boar.png'
import boar from '../../assets/boar-pxlz.png'
import { useGameStore } from '../stores/gameStore'

const game = useGameStore()

const boarSprite = computed(() => {
  return game.boar.isDead ? brokenBoar : boar
})

const health = computed(() => {
  return `${(game.boar.currentHealth / game.boar.maxHealth) * 100}%`
})
</script>

<template>
  <div class="enemy">
    <div class="enemy__health">
      <span>кабан</span>
      <div class="enemy__health-inner" :style="{ width: health }"></div>
    </div>
    <img class="enemy__portrait" :src="boarSprite" />
  </div>
</template>

<style scoped>
.enemy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
}

.enemy__health {
  position: relative;
  font-size: 20px;
  font-family: 'Stalinist Regular';
  border: 2px solid #990000;
  width: 320px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #303030;
}

.enemy__health span {
  z-index: 2;
}

.enemy__health-inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 32px;
  z-index: 1;
  background: linear-gradient(#990000, #5a0000);
}

.enemy__health::before {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  left: -20px;
  content: '1';
  font-size: 32px;
  width: 56px;
  height: 56px;
  background: #5a0000;
  border: 2px solid #990000;
  border-radius: 50%;
}

.enemy__portrait {
  width: 470px;
  height: 240px;
  background-size: contain;
  animation: breathing 2s ease-in-out infinite;
  transform-origin: center center;
  will-change: transform;
}

@keyframes breathing {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
}
</style>
