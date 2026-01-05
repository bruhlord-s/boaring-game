<script setup>

import MainMenu from './components/MainMenu.vue'
import { useGameStore } from './stores/gameStore'
import GameScene from './components/GameScene.vue'
import { onMounted, onUnmounted } from 'vue'
import { Howl } from 'howler'

const game = useGameStore()
/** @var Howl */
let sound

onMounted(() => {
  sound = new Howl({
    src: ['../assets/sounds/music.wav'],
    loop: true,
    autoplay: true,
  })

  sound.play()
})
onUnmounted(() => {
  sound.stop()
})
</script>

<template>
  <GameScene v-if="game.gameStarted" />
  <MainMenu v-else />
</template>

<style scoped>

</style>
