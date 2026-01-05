<script setup>
import { computed, ref, watch } from 'vue'
import brokenBoar from '../../assets/broken-boar.png'
import boar from '../../assets/boar-pxlz.png'
import { useGameStore } from '../stores/gameStore'

const game = useGameStore()
const damages = ref([])

const boarSprite = computed(() => {
  return game.boar.isDead ? brokenBoar : boar
})

const health = computed(() => {
  return `${(game.boar.currentHealth / game.boar.maxHealth) * 100}%`
})

// Отслеживание получения урона кабаном
watch(() => game.boar.currentHealth, (cur, prev) => {
  damages.value.push(prev - cur)

  setTimeout(() => {
    damages.value.shift()
  }, 1500)
})

</script>

<template>
  <div class="enemy">
    <div class="enemy__health">
      <span class="enemy__level">{{ game.round }}</span>
      <span>кабан</span>
      <div class="enemy__health-inner" :style="{ width: health }"></div>
    </div>
    <img class="enemy__portrait" :src="boarSprite" />

    <div class="damage__container">
      <span
        v-for="(dmg, index) in damages"
        :key="index"
        class="damage__value"
      >
        {{ dmg }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.enemy {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  position: relative;
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

.enemy__level {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 999;
  left: -20px;
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

.damage__container {
  position: absolute;
  top: 0;
  left: 100%;
  width: 50px;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}

.damage__value {
  position: absolute;
  font-size: 40px;
  font-weight: 900;
  color: #ff3333;
  text-shadow:
    0 0 5px #ff3333,
    0 0 10px rgba(255, 255, 255, 0.5),
    2px 2px 0 rgba(0, 0, 0, 0.8);
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transform-origin: center;
  animation: floatUp 1.5s ease-out forwards;
  bottom: 50%;
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

@keyframes floatUp {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  20% {
    opacity: 1;
    transform: translateY(-20px) scale(1.2);
  }
  40% {
    transform: translateY(-40px) scale(1.1);
  }
  70% {
    opacity: 0.8;
    transform: translateY(-60px) scale(0.9);
  }
  100% {
    opacity: 0;
    transform: translateY(-80px) scale(0.7);
  }
}
</style>
