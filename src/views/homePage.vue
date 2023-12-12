<template>
  <div>
    <div class="app-title">
      Welcome to the Greatest Trivia Quiz Ever!
    </div>
    <div class="main">
      <div class="sub-main">
        <div>
          log in to save your progress!
        </div>
      </div>
      <n-divider vertical style="height: 22rem ; background-color: black;" />
      <div class="sub-main">
        <n-button type="success" class="button" @click="customizeQuiz">
          <template #icon>
            <n-icon size="1.5rem">
              <settings />
            </n-icon>
          </template>
          Customize your quiz here!
        </n-button>
        <div style="font-size:1.5rem;">Or</div>
        <div>
          <span class="preset-title">
            Pick a preset!
          </span>
          <div class="presets">
            <div class="preset" @click="proceedWithPreset('easy')">
              <img src="../assets/pacifier.png" alt="" width="100" style="transform: rotate(30deg);" draggable="false">
              <span>Easy Peasy</span>
            </div>
            <div class="preset" @click="proceedWithPreset('medium')">
              <img src="../assets/book.png" alt="" width="100" draggable="false">
              <span>Aight</span>
            </div>
            <div class="preset" @click="proceedWithPreset('hard')">
              <img src="../assets/hat.png" alt="" width="100" draggable="false">
              <span>Sheeesh</span>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    <n-modal v-model:show="showModal">
      <n-card style="width: 20rem" title="Customize Quiz" :bordered="true" size="huge">
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
        <template #footer>
          <n-button>Looks Good!</n-button>
          <n-button>Go Back</n-button>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup>
import { NDivider, NIcon, NButton, NModal, NCard, NRadioButton, NRadioGroup } from 'naive-ui'
import { Settings } from '@vicons/ionicons5'
import { reactive, ref } from 'vue'
import { useQuizStore } from '@/store/quiz.js'
const quizStore = useQuizStore()

import { useRouter } from 'vue-router'
const router = useRouter()
const showModal = ref(false)
const customizeQuiz = () => {
  showModal.value = true
}

const quiz = reactive({
  amount: 0,
  difficulty: 'easy'
})

const proceedWithPreset = (preset) => {
  quizStore.difficulty = preset
  if (preset === 'easy') {
    quizStore.amount = '5'
  } else if (preset === 'medium') {
    quizStore.amount = '10'
  } else {
    quizStore.amount = '15'
  }
  router.push('/quiz')

}
</script>
<style lang="scss" scoped>
.app-title {
  display: grid;
  place-content: center;
  font-size: 2rem;
}

.main {
  display: flex;
  justify-content: center;
  padding: .5rem;
  ;

  .sub-main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    gap: 1rem;

    .button {
      padding: 2rem;
      font-size: 1.5rem;
      border: .125rem black solid;

    }

    .preset-title {
      display: grid;
      place-content: center;
      font-size: 2rem;
    }

    .presets {
      display: flex;
      gap: 1rem;
      transition: transform 0.3s ease;

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
</style>