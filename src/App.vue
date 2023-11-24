<script setup>
import { NButton, NSpace } from 'naive-ui'
</script>

<template>
  <!-- <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/quiz">Quiz</router-link> |
    <router-link to="/achievements">Achievements</router-link>
  </div> -->
  <div class="main">
    <div class="app">
      <router-view></router-view>
    </div>

  </div>
</template>

<style scoped>
/* 
Bright Yellow (Primary Color):
HEX: #FFD700
HSL: hsl(50, 100%, 50%)
Teal/Cyan (Secondary Color):
HEX: #00CED1
HSL: hsl(180, 100%, 40%)
Pink/Purple (Accent Color):
HEX: #FF1493
HSL: hsl(330, 100%, 54%) */

.main {
  display: grid;
  place-items: center;
  height: 100dvh
}

.main .app {
  min-height: 70dvh;
  min-width: 70dvh;
  border-radius: 10px;
  background-color: hsl(180, 100%, 40%);
}
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');

body {
  background-color: hsl(50, 100%, 50%);
  font-family: 'Pangolin', cursive;
}
</style>
