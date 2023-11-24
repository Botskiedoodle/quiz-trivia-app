<template>
  <div>
    <div v-for="(quizItem, questionIndex) in quiz.content" :key="quizItem.question"
      v-show="quiz.answered === questionIndex">
      <div v-html="quizItem.question"></div>
      <div>

      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue'
import axios from 'axios'

const quiz = reactive({
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
        quizResponse.forEach((question) => {

          if (question.type === 'multiple') {
            question.answers = randomizedAnswers(question.correct_answer, question.incorrect_answers)
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
<style scoped></style>