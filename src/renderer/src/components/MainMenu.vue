<script setup>
import { useGameStore } from '../stores/gameStore'
import brokenBoar from '../../assets/broken-boar.png'
import { onBeforeUnmount, onMounted } from 'vue'

const game = useGameStore()

onMounted(() => {
  document.addEventListener('keyup', (e) => handleKeyup(e))
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', (e) => handleKeyup(e))
})

const handleKeyup = (e) => {
  e.preventDefault()

  if (e.key === 'Enter') {
    onStart()
  }
}

const onStart = () => {
  game.startGame()
  game.isPreGame = true
}
</script>

<template>
  <div class="menu-wrapper">
    <div class="menu">
      <div class="menu__left">
        <div class="menu__label">
          <img class="menu__icon" :src="brokenBoar" />
          <h1 class="menu__title">boaring game.</h1>
        </div>

        <div class="menu__secondary">определенно одна из игр</div>
      </div>
      <div class="menu__right">
        <div class="menu__rules">
          <h2 class="menu__rules-title">печатайте чтобы жить</h2>
          <p class="menu__rules-section">На вас напала <b>стая кабанчиков!</b></p>
          <p class="menu__rules-section">
            Чтобы отбиться от кабанчиков печатайте очень интересные тексты.
          </p>
          <p class="menu__rules-section">
            <b>Поторопитесь!</b> Кабаны не ждут. Если вы печатаете недостаточно быстро, то они
            растопчат вас.
          </p>
          <p class="menu__rules-section">
            <b>Не ошибайтесь!</b> Ошибки в тексте могут привести к печальным последствиям.
          </p>
        </div>
        <div @click="onStart" class="menu__cta">вперед</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu {
  color: #000;
  display: flex;
  gap: 24px;
}

.menu__left {
  background-color: #fff;
  width: 600px;
  border-radius: 8px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu__title {
  font-family: 'Stalinist Regular';
  font-size: 64px;
}

.menu__label {
  display: flex;
  flex-direction: column;
}

.menu__icon {
  width: 300px;
}

.menu__secondary {
  font-family: 'Roboto Mono';
  font-size: 24px;
  color: #707070;
}

.menu__right {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.menu__rules {
  width: 440px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 20px;
}

.menu__rules-title {
  font-family: 'Stalinist Regular';
  font-size: 32px;
}

.menu__rules-section {
  font-family: 'Roboto Mono';
  font-size: 20px;
  color: #707070;
}

.menu__rules-section b {
  color: #000;
  font-weight: 500;
}

.menu__cta {
  background-color: #fff;
  border-radius: 8px;
  font-family: 'Roboto Mono';
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: 600;
  padding: 12px 0;
  cursor: pointer;
  transition: 0.1s ease-in;
}

.menu__cta:hover {
  background-color: #cecece;
}
</style>
