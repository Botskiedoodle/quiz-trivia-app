// create this store for easier tracking of quiz
import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'


export const useQuizStore = defineStore(
  'quiz',
  () => {

    const correct = ref(0)

    function addCorrect() {
      correct.value++
    }

    function initializeQuiz() {
      correct.value = 0
    }

    return { initializeQuiz, addCorrect, correct }
  }
)