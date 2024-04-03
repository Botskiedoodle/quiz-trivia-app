<template>
  <div>
    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      url="http://foo.bar/particles.json"
    />

    <vue-particles
      id="tsparticles"
      @particles-loaded="particlesLoaded"
      :options="{
        background: {
          color: {
            value: '#0d47a1'
          }
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'push'
            },
            onHover: {
              enable: true,
              mode: 'repulse'
            }
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40
            },
            push: {
              quantity: 4
            },
            repulse: {
              distance: 200,
              duration: 0.4
            }
          }
        },
        particles: {
          color: {
            value: '#ffffff'
          },
          links: {
            color: '#ffffff',
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: 'bounce',
            random: false,
            speed: 6,
            straight: false
          },
          number: {
            density: {
              enable: true
            },
            value: 80
          },
          opacity: {
            value: 0.5
          },
          shape: {
            type: 'circle'
          },
          size: {
            value: { min: 1, max: 5 }
          }
        },
        detectRetina: true
      }"
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
