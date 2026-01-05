<script setup>
import Enemy from './Enemy.vue'
</script>

<template>
  <div class="enemy-screen">
    <Enemy :is-dead="false" />
  </div>
</template>

<style scoped>
.enemy-screen {
  width: 1200px;
  height: 480px;
  background-image: url('../../assets/bg-pxlz.png');
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
