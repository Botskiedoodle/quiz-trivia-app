<template>
  <div class="container">
    <p class="title">Achievements</p>
    <div class="achievements">
      <div v-for="achievement in achievements" :key="achievement.id">
        <achievement-badge
          :flag="achievement.flag"
          :image="achievement.image"
          :title="achievement.title"
        />
      </div>
    </div>
    <n-button type="info" @click="goBack" class="button">Go Back</n-button>
  </div>
</template>
<script setup>
import { NButton } from "naive-ui";
import { useRouter } from "vue-router";

import achievementBadge from "@/components/achievementBadge.vue";

import { useUserStore } from "@/store/user.js";
const userStore = useUserStore();

const achievements = userStore.achievementBadges;

const router = useRouter();
const goBack = () => {
  router.push("/");
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    text-align: center;
    font-size: 2rem;
  }
  .achievements {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding-bottom: 1rem;
  }
}

.rotate {
  height: auto;
  animation: rotateHorizontal 2s ease-in; /* Adjust animation duration and timing function as needed */
}

@keyframes rotateHorizontal {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
}
</style>
