<template>
  <div class="main-quiz">
    <div v-if="quiz.content.length === 0">
      Loading...
    </div>
    <div v-else>
      <header style="font-size: x-large; font-weight: bold; padding: 0 0 1rem 0;">
        Question {{ quiz.answered + 1 }} of {{ quiz.content.length }}
      </header>

      <div v-for="(quizItem, questionIndex) in quiz.content" :key="quizItem.question" style="text-align: center;"
        v-show="quiz.answered === questionIndex">
        <div style="font-size: 1.5rem; padding-bottom: 2rem;">{{ quizItem.question }}</div>
        <div style="display: flex; align-items: center; gap: 2rem; justify-content: center;">
          <div class="answers">
            <div v-for="answer in quizItem.answers" :key="answer" @click="pickAnswer(quizItem.correct_answer, answer)">
              <n-button :type="buttonType(quizItem.correct_answer, answer)" class="button">
                {{ answer }}
              </n-button>
            </div>
          </div>
          <div>
            <div class="controls">
              <n-result :status="result.status" size="huge" />
              <div class="user-lives">
                <img v-for="life in userStore.lives" :key="life" src="../assets/heart.png" width="50" alt="user life">
              </div>
              <n-button type="success" style="border: white 1px solid;" @click="nextQuestion()">
                {{ result.buttonText }}
              </n-button>
              <n-button @click="quitQuiz" type="error" style="border: white 1px solid; ">
                Quit
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { NButton, useDialog, NResult } from 'naive-ui'
import { reactive, onMounted, onUpdated, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'


import { useQuizStore } from '@/store/quiz.js'
const quizStore = useQuizStore()

import { useUserStore } from '@/store/user.js'
const userStore = useUserStore()

const router = useRouter()
const dialog = useDialog()

const lifeCheck = () => {
  if (userStore.lives === 0) {
    router.push('/quiz-finished')
  }
}

const buttonType = (correctAnswer, answer) => {
  if (!quiz.notAnswered) {
    if (answer === correctAnswer) {
      return 'success'
    } else if (quiz.pickedAnswer === answer) {
      return 'error'
    } else {
      return 'info'
    }
  } else {
    return 'info'
  }
}


const pickAnswer = (correctAnswer, userAnswer) => {
  if (quiz.notAnswered === true) {
    dialog.warning({
      title: 'Confirm Answer',
      content: 'Is that your final answer?',
      positiveText: 'Yes',
      negativeText: 'Not Sure',
      onPositiveClick: () => {
        quiz.pickedAnswer = userAnswer
        if (userAnswer === correctAnswer) {
          quiz.correct++
          quizStore.addCorrect()
          result.status = 'success'
        } else {
          result.status = 'error'
          userStore.subtractLife()
        }

        if (quiz.answered === 9) {
          result.buttonText = 'Finish Quiz'
        }
        quiz.notAnswered = false
        result.buttonText = 'Next Question'
      },
      onNegativeClick: () => {

      }
    })
  }

}
const result = reactive({
  status: '404',
  title: 'Correct!',
  buttonText: 'Skip Question'
})

const proceedToNext = () => {
  quiz.answered++
  quiz.notAnswered = true
  result.status = '404'
  result.buttonText = 'Skip Question'
  if (quiz.answered === 10) {
    router.push('/quiz-finished')
  }
}

const nextQuestion = () => {
  if (quiz.notAnswered == true) {
    dialog.warning({
      title: 'Skip Question',
      content: 'Are you sure you want to skip this question? This would cost you a life.',
      positiveText: 'Yes',
      negativeText: 'No',
      onPositiveClick: () => {
        proceedToNext()
        userStore.subtractLife()
      }
    })
  } else {
    proceedToNext()
  }
}

const quiz = reactive({
  pickedAnswer: '',
  notAnswered: true,
  correct: 0,
  answered: 0,
  loading: '',
  content: [],
  difficulty: 'easy'
})

const apiURL = 'https://opentdb.com/api.php?amount=10&encode=base64'

const randomizedAnswers = (correctAnswer, incorrectAnswers) => {
  let incorrect_answers = incorrectAnswers
  let correct_answer = correctAnswer
  let randomIndex = Math.floor(Math.random() * (incorrect_answers.length + 1));
  incorrect_answers.splice(randomIndex, 0, correct_answer)
  return incorrect_answers
}

const getQuiz = async (difficultyLevel) => {
  quiz.loading = true
  try {
    await axios.get(`${apiURL}&difficulty=${difficultyLevel}`)
      .then((res) => {
        let quizResponse = res.data.results
        quizResponse.forEach(obj => {
          for (let prop in obj) {
            if (Array.isArray(obj[prop])) {
              for (let i = 0; i < obj[prop].length; i++) {
                obj[prop][i] = atob(obj[prop][i])
              }
            } else {
              obj[prop] = atob(obj[prop])
            }
          }
        })
        quizResponse.forEach((question) => {
          if (question.type === 'multiple') {
            question.answers = randomizedAnswers(question.correct_answer, question.incorrect_answers)
          } else {
            question.answers = ['True', 'False']
          }

        })
        quiz.content = [...quizResponse]
      })
  }
  catch (error) {
    console.log(error)
  }
  finally {
    quiz.loading = false
  }
}

const quitQuiz = () => {
  dialog.warning({
    title: 'Quit Quiz',
    content: 'Are you sure you want to quit this quiz and return to home screen? Your progress will not be saved.',
    positiveText: 'Yes',
    negativeText: 'No',
    onPositiveClick: () => {
      router.push('/')
    }
  })
}

onUpdated(() => {
  lifeCheck()
})

onMounted(() => {
  getQuiz(quiz.difficulty)
  userStore.initializeLives()
  quizStore.initializeQuiz()
})


</script>
<style scoped>
.main-quiz {
  display: flex;
  flex-direction: column;
  width: 50rem;
  align-items: center;
}

.answers {
  gap: 1rem;
  display: flex;
  flex-direction: column;

}

.button {
  min-width: 24rem;
  padding: 2rem;
  border: white 1px solid;

}

.controls {
  display: flex;
  background-color: black;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border-radius: 1rem;
  min-width: 12rem;
}

.user-lives {
  display: flex;
  gap: 1rem
}

.n-button .wrapped-text {
  word-wrap: break-word !important;
  width: 24rem;
}
</style>