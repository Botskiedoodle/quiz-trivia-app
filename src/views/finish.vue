<template>
  <div>
    <div v-if="gif.loading">Loading...</div>
    <div v-else>
      <h1 style="display: grid; place-content: center">{{ result.title }}</h1>
      <img
        :src="gif.source"
        :width="gif.width"
        :height="gif.height"
        style="border-radius: 1rem; border: 2px black solid"
      />
      <div class="result-summary">
        <span>
          {{ quizStore.correct }}
        </span>
        correct answers out of <span>{{ quizStore.amount }}</span>
      </div>
      <div class="controls">
        <n-button type="success" @click="playAgain()">Play again</n-button>
        <n-button type="info" @click="goHome()">Return to Home</n-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { NButton } from "naive-ui";

import { useQuizStore } from "@/store/quiz.js";
const quizStore = useQuizStore();

import { useUserStore } from "@/store/user.js";
import { onMounted, reactive } from "vue";

import { useRouter } from "vue-router";
const router = useRouter();

import axios from "axios";
import { getRandomGif } from "@/api";
const gif = reactive({
  height: "",
  width: "",
  source: "",
  loading: true
});

const getGif = async () => {
  try {
    gif.loading = true;
    const fetchedGIF = await getRandomGif(result.failed);
    gif.source = fetchedGIF.url;
    gif.width = fetchedGIF.width;
    gif.height = fetchedGIF.height;
  } catch (error) {
    console.log(error);
  } finally {
    gif.loading = false;
  }
};

const playAgain = () => {
  router.push("/quiz");
};

const goHome = () => {
  router.push("/");
};

const userStore = useUserStore();

const result = reactive({
  title: "Quiz Finished!",
  failed: false
});

const checkIfQuizFailed = () => {
  if (userStore.lives === 0) {
    result.title = "You lost";
    result.failed = true;
  } else {
    result.title = "Quiz Finished!";
    result.failed = false;
  }
};
onMounted(() => {
  checkIfQuizFailed();
  getGif();
});
</script>
<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-summary {
  /* display: grid;
  place-items: center;
  grid-gap: .5rem;
  padding: 1rem; */
  text-align: center;
  font-size: 1rem;
  padding: 1rem;
}
</style>
