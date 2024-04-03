<template>
  <div>
    <div class="app-title">Welcome to the Greatest Trivia Quiz Ever!</div>
    <div class="main">
      <div class="sub-main">
        <n-button
          type="info"
          size="large"
          class="button"
          @click="goToAchievements"
        >
          <template #icon>
            <n-icon size="1.5rem">
              <logo-google />
            </n-icon>
          </template>
          Log in to earn badges!</n-button
        >
      </div>
      <div class="sub-main">
        <n-button
          type="success"
          size="large"
          @click="customizeQuiz"
          class="button"
        >
          <template #icon>
            <n-icon size="1.5rem" id="spinIcon">
              <settings />
            </n-icon>
          </template>
          <div style="padding-left: 0.25rem">Customize your quiz here!</div>
        </n-button>
        <div style="font-size: 1.5rem">Or</div>
        <div>
          <span class="preset-title"> Pick a preset! </span>
          <div class="presets">
            <div class="preset" @click="proceedWithPreset('easy')">
              <img
                src="../assets/pacifier.png"
                alt=""
                width="60"
                style="transform: rotate(30deg)"
                draggable="false"
              />
            </div>
            <div class="preset" @click="proceedWithPreset('medium')">
              <img
                src="../assets/book.png"
                alt=""
                width="60"
                draggable="false"
              />
            </div>
            <div class="preset" @click="proceedWithPreset('hard')">
              <img
                src="../assets/hat.png"
                alt=""
                width="60"
                draggable="false"
              />
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
    <n-modal v-model:show="showModal">
      <n-card style="width: 24rem" :bordered="true" size="large">
        <div class="card-title">
          Customize Quiz
          <div>
            <n-icon size="2rem" id="spinIcon">
              <settings />
            </n-icon>
          </div>
        </div>
        <div class="card">
          <n-radio-group v-model:value="quiz.amount">
            <n-radio-button :value="'5'">5</n-radio-button>
            <n-radio-button :value="'10'">10</n-radio-button>
            <n-radio-button :value="'15'">15</n-radio-button>
          </n-radio-group>
          <n-radio-group v-model:value="quiz.difficulty">
            <n-radio-button :value="'easy'">Easy Peasy</n-radio-button>
            <n-radio-button :value="'medium'">Aight</n-radio-button>
            <n-radio-button :value="'hard'">Hard</n-radio-button>
          </n-radio-group>
          <n-radio-group v-model:value="quiz.type">
            <n-radio-button :value="''">Both</n-radio-button>
            <n-radio-button :value="'multiple'">Multiple Choice</n-radio-button>
            <n-radio-button :value="'boolean'">True or False</n-radio-button>
          </n-radio-group>
        </div>

        <template #footer>
          <div class="modal-cta">
            <n-button type="success" @click="proceedWithCustom"
              >Looks Good!</n-button
            >
            <n-button type="error" @click="closeModal">Go Back</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup>
import {
  NIcon,
  NButton,
  NModal,
  NCard,
  NRadioButton,
  NRadioGroup
} from "naive-ui";
import { Settings, LogoGoogle } from "@vicons/ionicons5";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

import { displayConfetti } from "@/utility";
import { useQuizStore } from "@/store/quiz.js";
const quizStore = useQuizStore();

displayConfetti();

const goToAchievements = () => {
  router.push("/achievements");
};

const router = useRouter();
const showModal = ref(false);

const customizeQuiz = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const quiz = reactive({
  amount: "5",
  type: "",
  difficulty: "easy"
});

const proceedWithCustom = () => {
  quizStore.difficulty = quiz.difficulty;
  quizStore.amount = quiz.amount;
  quizStore.type = quiz.type;
  router.push("/quiz");
};

const proceedWithPreset = (preset) => {
  quizStore.difficulty = preset;
  quizStore.type = "";
  if (preset === "easy") {
    quizStore.amount = "5";
  } else if (preset === "medium") {
    quizStore.amount = "10";
  } else {
    quizStore.amount = "15";
  }
  router.push("/quiz");
};
</script>
<style lang="scss" scoped>
.app-title {
  text-align: center;
  font-size: 2rem;
  padding: 1rem;
}

.main {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;

  .sub-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .button {
      min-width: 16rem;
    }

    .preset-title {
      display: grid;
      place-content: center;
      font-size: 2rem;
    }

    .presets {
      display: flex;
      gap: 1.25rem;
      transition: transform 0.3s ease;
      flex-wrap: wrap;

      .preset {
        display: flex;
        flex-direction: column;
        text-align: center;
        font-size: 1rem;
        user-select: none;

        &:hover {
          transform: scale(1.1);
          cursor: pointer;
        }
      }
    }
  }
}

.modal-cta {
  display: flex;
  gap: 0.5rem;
  float: right;
}

.card-title {
  padding-bottom: 1rem;
  font-size: 2rem;
  color: black;
  display: flex;
  gap: 1rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

#spinIcon {
  display: inline-block;
  animation: spin 10s linear infinite;
  /* Adjust duration or animation style as needed */
}
</style>
