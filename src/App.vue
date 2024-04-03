<template>
  <div>
    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      :options="particleOptions"
    />
    <n-message-provider>
      <n-dialog-provider>
        <div class="main">
          <div class="app">
            <router-view></router-view>
          </div>
        </div>
      </n-dialog-provider>
    </n-message-provider>
  </div>
</template>
<script setup>
import { NDialogProvider, NMessageProvider } from "naive-ui";
import { particleOptions } from "@/utility/particleOptions";
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};
</script>
<style scoped>
.main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  position: relative;
  z-index: 10;
  user-select: none;
  margin: 0.75rem;
}

.main .app {
  border-radius: 10px;
  background-color: hsl(50, 100%, 50%);
  padding: 1rem;
  border: 0.125rem black solid;
  max-width: 40rem;
}
</style>
<style>
@import url("https://fonts.googleapis.com/css2?family=Pangolin&display=swap");

body {
  background-color: hsl(180, 100%, 40%);
  font-family: "Pangolin", cursive;
}
</style>
