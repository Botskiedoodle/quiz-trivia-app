<template>
  <div v-for="(quizItem, questionIndex) in quiz.content" :key="quizItem.question"
    v-show="quiz.answered === questionIndex">
    <div v-html="quizItem.question" style="font-size: 1.5rem;"></div>
    <div class="answers">
      <div v-for="answer in quizItem.answers" :key="answer" @click="pickAnswer(quizItem.correct_answer, answer)">
        <n-button type="info" class="button"> {{ answer }}</n-button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { NButton, useDialog, useMessage } from 'naive-ui'
import { reactive, onMounted } from 'vue'

import axios from 'axios'


const dialog = useDialog()
const message = useMessage()

const pickAnswer = (correctAnswer, userAnswer) => {
  dialog.warning({
    title: 'Confirm Answer',
    content: 'Is that your final answer?',
    positiveText: 'Yes',
    negativeText: 'Not Sure',
    onPositiveClick: () => {
      // check if correctAnswer === userAnswer
      // if the answer is correct, turn the button green
      // quiz.correct++
      // quiz.answered++
      console.log('Handle Yes')
    },
    onNegativeClick: () => {
      console.log('Handle no')
    }
  })
}

const quiz = reactive({
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
.answers {
  display: flex;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.button {
  width: 10rem;
  padding: 2rem;
  border: white 1px solid;
  margin-right: 1rem;
  margin-bottom: 1rem;
}
</style>