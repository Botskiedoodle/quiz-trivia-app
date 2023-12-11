<template>
  <div>
    <h1 style="display: grid; place-content: center;">{{ result.title }}</h1>
    <div v-if="result.failed">
      <iframe src="https://giphy.com/embed/B4uP3h97Hi2UaqS0E3" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
    <div v-else>
      <iframe src="https://giphy.com/embed/etKSrsbbKbqwW6vzOg" width="480" height="480" frameBorder="0" ></iframe>
    </div>
    <div v-if="!result.failed">
      {{ quizStore.correct }} correct answers out of 10
    </div>
    <div class="controls">
      <n-button type="success" @click="playAgain()">Play again</n-button>
      <n-button type="info" @click="goHome()">Return to Home</n-button>
    </div>
  </div>
</template>
<script setup>
import {NButton} from 'naive-ui'

import { useQuizStore } from '@/store/quiz.js'
const quizStore = useQuizStore()

import {useUserStore} from '@/store/user.js'
import { onMounted,reactive } from 'vue';

import { useRouter } from 'vue-router'
const router = useRouter()

const playAgain = () => {
  router.push('/quiz')
}

const goHome = () => {
  router.push('/')
}


const userStore = useUserStore()

const result = reactive({
  title: 'Quiz Finished!',
  failed: false
})

const checkIfQuizFailed = () => {
  if(userStore.lives === 0){
    result.title = 'You lost'
    result.failed = true
  } else {
    result.title = 'Quiz Finished!'
    result.failed = false
  }
}
onMounted(()=>{
  checkIfQuizFailed()
})
</script>
<style scoped>

.controls {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
</style>