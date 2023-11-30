<template>
  <div>
    <div>
      Quiz Finished!
    </div>
    <div>
      {{ quizStore.correct }} correct answers out of 10
    </div>
  </div>
</template>
<script setup>
import { useQuizStore } from '@/store/quiz.js'
const quizStore = useQuizStore()
// import { useUserStore } from '@/store/user.js'
// const userStore = useUserStore()


</script>
<style scoped></style>