<script setup>
import { computed, ref, watch } from 'vue'
import { useGameStore } from '../stores/gameStore'
import boar1 from '../../assets/boar1.png'
import boar2 from '../../assets/boar2.png'
import boar3 from '../../assets/boar3.png'
import boar4 from '../../assets/boar4.png'
import boar5 from '../../assets/boar5.png'
import boar6 from '../../assets/boar6.png'
import boar7 from '../../assets/boar7.png'
import brokenBoar1 from '../../assets/broken-boar1.png'
import brokenBoar2 from '../../assets/broken-boar2.png'
import brokenBoar3 from '../../assets/broken-boar3.png'
import brokenBoar4 from '../../assets/broken-boar4.png'
import brokenBoar5 from '../../assets/broken-boar5.png'
import brokenBoar6 from '../../assets/broken-boar6.png'
import brokenBoar7 from '../../assets/broken-boar7.png'

const game = useGameStore()
const damages = ref([])

const boarSprite = computed(() => {
  // простите
  const dict = {
    boar1,
    boar2,
    boar3,
    boar4,
    boar5,
    boar6,
    boar7,
    brokenBoar1,
    brokenBoar2,
    brokenBoar3,
    brokenBoar4,
    brokenBoar5,
    brokenBoar7,
    brokenBoar6
  }

  return game.boar.isDead ? dict[`brokenBoar${game.round}`] : dict[`boar${game.round}`]
})

const health = computed(() => {
  return `${(game.boar.currentHealth / game.boar.maxHealth) * 100}%`
})

const name = computed(() => {
  const names = [
    'кабан',
    'кабан-мороз',
    'кабан кабаныч',
    'кабан-хацкер',
    'этот белый',
    'набак',
    'sus кабан'
  ]

  return names[game.round - 1]
})

// Отслеживание получения урона кабаном
watch(
  () => game.boar.currentHealth,
  (cur, prev) => {
    if (prev - cur < 0) {
      return
    }

    damages.value.push(prev - cur)

    setTimeout(() => {
      damages.value.shift()
    }, 1500)
  }
)
</script>

<template>
  <div class="enemy">
    <div class="enemy__health">
      <span class="enemy__level">{{ game.round }}</span>
      <span>{{ name }}</span>
      <div class="enemy__health-inner" :style="{ width: health }"></div>
    </div>
    <img class="enemy__portrait" :src="boarSprite" />

    <div class="damage__container">
      <span v-for="(dmg, index) in damages" :key="index" class="damage__value">
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
