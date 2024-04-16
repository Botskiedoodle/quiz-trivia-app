<template>
  <div class="container">
    <p class="title">Achievements</p>
    <div class="achievements">
      <div v-for="achievement in achievementBadges" :key="achievement.id">
        <achievement-badge
          :flag="checkForFlag(achievement.id)"
          :image="achievement.image"
          :title="achievement.title"
          @click="inspectAchievement(achievement)"
        />
      </div>
    </div>
    <div class="cta-container">
      <n-button type="info" @click="goBack">Go Back</n-button>
      <n-button type="error" @click="handleSignOut">Sign out</n-button>
    </div>
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
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useDialog } from "naive-ui";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import achievementBadge from "@/components/AchievementBadge/index.vue";
import { useUserStore } from "@/store/user.js";
import { displayConfetti } from "@/utility";
import { achievements } from "@/constants/achievements.js";
const isLoggedIn = ref(false);

const userStore = useUserStore();
const userAchievements = userStore.achievementBadges;
const achievementBadges = achievements;
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

const inspectAchievement = ({ id, clue, title, description, image }) => {
  let flag = checkForFlag(id);
  if (flag === 0) {
    achievementModal.description = clue;
    achievementModal.image = "lock";
  } else {
    achievementModal.description = description;
    achievementModal.image = image;
  }
  achievementModal.title = title;
  achievementModal.show = true;
};

const handleCloseModal = () => {
  achievementModal.show = false;
};
const router = useRouter();
const goBack = () => {
  router.push("/");
};

let auth;
const dialog = useDialog();
const handleSignOut = () => {
  dialog.warning({
    title: "Confirm",
    content:
      "Are you sure you want to log out? Your progress will not be saved",
    positiveText: "Sure",
    negativeText: "Not Sure",
    onPositiveClick: () => {
      auth = getAuth();
      signOut(auth).then(() => {
        router.push("/");
      });
    }
  });
};

const checkForFlag = (id) => {
  for (const key in userAchievements) {
    if (Object.hasOwnProperty.call(userAchievements, key)) {
      const badge = userAchievements[key];
      if (badge.id === id) {
        return badge.flag;
      }
    }
  }
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

.cta-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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
