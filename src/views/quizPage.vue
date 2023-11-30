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
        <div style="font-size: 1.5rem; padding-bottom: .5rem;">{{ quizItem.question }}</div>
        <div style="display: flex; align-items: center; gap: 2rem;">
          <div class="answers">
            <div v-for="answer in quizItem.answers" :key="answer" @click="pickAnswer(quizItem.correct_answer, answer)">
              <n-button type="info" class="button"> {{ answer }}</n-button>
            </div>
          </div>
          <div>
            <div style="display: flex; flex-direction: column; gap: 1rem">
              <n-result :status="result.status" size="huge"
                style="  background-color: hsl(270, 100%, 50%); border-radius: 1rem; width: fit-content; padding: 1rem; " />
              <n-button type="info" style="  border: white 1px solid;">{{ result.buttonText }}</n-button>
              <!-- show lives here and controls -->
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script setup>
import { NButton, useDialog, NResult } from 'naive-ui'
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import { useQuizStore } from '@/store/quiz.js'
const quizStore = useQuizStore()

// change the color of the button of the correct answer
// if the answer is wrong, change the color of the selected answer to red and the correct answer to green
// make all answers unclickable after answering
// show the next question button after answering and then hide it after a new question is shown

const router = useRouter()
const dialog = useDialog()


const pickAnswer = (correctAnswer, userAnswer) => {
  dialog.warning({
    title: 'Confirm Answer',
    content: 'Is that your final answer?',
    positiveText: 'Yes',
    negativeText: 'Not Sure',
    onPositiveClick: () => {
      if (userAnswer === correctAnswer) {

        quiz.correct++
        quizStore.addCorrect()
        result.status = 'success'
        result.title = 'Correct!'
      } else {

        result.status = 'error'
        result.title = 'Incorrect!'
      }
      if (quiz.answered === 10) {
        result.buttonText = 'Finish Quiz'
      }
    },
    onNegativeClick: () => {

    }
  })
}
const result = reactive({

  status: '404',
  title: 'Correct!',
  buttonText: 'Next Question'
})

const nextQuestion = () => {
  quiz.answered++
  if (quiz.answered === 10) {
    router.push('/quiz-finished')
  }
}

const quiz = reactive({
  isAnswered: false,
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

onMounted(() => {
  getQuiz(quiz.difficulty)
})

</script>
<style scoped>
.main-quiz {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.answers {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  align-items: center;
}

.button {
  width: 24rem;
  padding: 2rem;
  border: white 1px solid;
  margin-right: 1rem;
  margin-bottom: 1rem;
  word-break: break-word;
}
</style>