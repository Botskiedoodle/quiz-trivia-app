<template>
  <div>
    <div v-if="gif.loading">
      Loading...
    </div>
    <div v-else>
      <h1 style="display: grid; place-content: center;">{{ result.title }}</h1>
      <img :src="gif.source" :width="gif.width" :height="gif.height" style="border-radius: 1rem;" />
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
import { NButton } from 'naive-ui'

import { useQuizStore } from '@/store/quiz.js'
const quizStore = useQuizStore()

import { useUserStore } from '@/store/user.js'
import { onMounted, reactive } from 'vue';

import { useRouter } from 'vue-router'
const router = useRouter()

import axios from 'axios'

const gif = reactive({
  height: '',
  width: '',
  source: '',
  loading: true
})

const getGif = async () => {
  let fetchedGIF = {}
  let loseArray = ['loser', 'lose', 'cry', 'crying', 'sad', 'fail', 'dumb', 'stupid']
  let winArray = ['winner', 'win', 'trophy', 'celebrate', 'champion', 'victor', 'triumph', 'success', 'victory']
  let searchString = ''
  if (result.failed) {
    const randomIndex = Math.floor(Math.random() * loseArray.length)
    searchString = loseArray[randomIndex]
  } else {
    const randomIndex = Math.floor(Math.random() * winArray.length)
    searchString = winArray[randomIndex]
  }
  let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=3N65mYWlRO6kIeRDAzf7meMhjCM04ToV&q=${searchString}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
  try {
    gif.loading = true
    await axios.get(apiURL)
      .then((res) => {
        const randomIndex = Math.floor(Math.random() * 50);
        fetchedGIF = res.data.data[randomIndex].images.fixed_height
        gif.source = fetchedGIF.url
        gif.width = fetchedGIF.width
        gif.height = fetchedGIF.height
      })
  }
  catch (error) {
    console.log(error)
  }
  finally {
    gif.loading = false
  }
}

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
  if (userStore.lives === 0) {
    result.title = 'You lost'
    result.failed = true
  } else {
    result.title = 'Quiz Finished!'
    result.failed = false
  }
}
onMounted(() => {
  checkIfQuizFailed()
  getGif()
})
</script>
<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: .5rem;
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