
  <!-- <div>
    <router-link to="/">Home</router-link> |
    <router-link to="/quiz">Quiz</router-link> |
    <router-link to="/achievements">Achievements</router-link>
    
  </div> -->
<template>
  <div>
    <n-message-provider>
      <n-dialog-provider>
        <div class="main">
          <div class="app">
            <router-view></router-view>
          </div>
        </div>
      </n-dialog-provider>
    </n-message-provider>
    <particles />
  </div>
</template>
<script setup>
import { NDialogProvider, NMessageProvider } from 'naive-ui';
import Particles from '@/components/particles.vue'



</script>
<style scoped>
.main {
  display: grid;
  place-items: center;
  height: 100vh;
  position: relative;
  z-index: 10;
  user-select: none;
}

.main .app {
  /* height: 70dvh; */
  /* width: 70dvh; */
  border-radius: 10px;
  background-color: hsl(50, 100%, 50%);
  padding: 2.5rem;
  border: .125rem black solid;
}
</style>
<style>
@import url('https://fonts.googleapis.com/css2?family=Pangolin&display=swap');

body {
  background-color: hsl(180, 100%, 40%);
  font-family: 'Pangolin', cursive;
}
</style>
