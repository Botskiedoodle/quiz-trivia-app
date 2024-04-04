<template>
  <div class="container">
    <p class="title">Achievements</p>
    <div class="achievements">
      <div v-for="achievement in achievements" :key="achievement.id">
        <achievement-badge
          :flag="achievement.flag"
          :image="achievement.image"
          :title="achievement.title"
          @click="inspectAchievement(achievement)"
        />
      </div>
    </div>
    <n-button type="info" @click="goBack" class="button">Go Back</n-button>
  </div>
  <n-modal v-model:show="achievementModal.show">
    <n-card :bordered="true" size="large" style="width: 24rem">
      <div class="modal">
        <div class="modal-title">{{ achievementModal.title }}</div>
        <img
          class="modal-image rotate"
          :src="imageURL"
          width="100"
          :alt="achievementModal.title"
        />
        <div class="modal-description">
          {{ achievementModal.description }}
        </div>
        <!-- <div v-html="achievementModal.description" /> -->
        <n-button type="primary" @click="handleCloseModal">Close</n-button>
      </div>
    </n-card>
  </n-modal>
</template>
<script setup>
import { useRouter } from "vue-router";
import achievementBadge from "@/components/achievementBadge.vue";
import { useUserStore } from "@/store/user.js";
import { reactive, computed } from "vue";
import { displayConfetti } from "@/utility";

const userStore = useUserStore();
const achievements = userStore.achievementBadges;
const achievementModal = reactive({
  show: false,
  title: "",
  description: ""
});
const imageURL = computed(() => {
  return new URL(
    `../assets/achievements/${achievementModal.image}.png`,
    import.meta.url
  ).href;
});

const inspectAchievement = ({ flag, title, description, image }) => {
  if (flag === 0) return;
  achievementModal.show = true;
  achievementModal.title = title;
  achievementModal.description = description;
  achievementModal.image = image;
};

const handleCloseModal = () => {
  achievementModal.show = false;
};
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
  align-content: center;

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

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  .modal-title {
    text-align: center;
    font-weight: 600;
    font-size: 2rem;
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
