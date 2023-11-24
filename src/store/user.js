import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'user',
  () => {

    const achievementBadges = reactive({
      zeroPointonSingleQuiz: 0,
      finishTheQuizOnce: 0,
      fiftyFiftyMaster: 0
    })

    const tracker = reactive({
      correctAnswers: {
        general: 0,
        trueOrFalse: 0,
      }
    })


    const lives = ref(0)

    function subtractLife() {
      lives.value--
    }

    function initializeLives() {
      lives.value = 3
    }

    return { lives, subtractLife, initializeLives, achievementBadges, tracker }
  }

)