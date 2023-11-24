import { createApp } from 'vue'
// import './style.css'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import HomePage from '@/views/homePage.vue'
import AchievementsPage from '@/views/achievementsPage.vue'
import QuizPage from '@/views/quizPage.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', name: 'Home', component: HomePage
    },
    {
      path: '/achievements', name: 'Achievements', component: AchievementsPage
    },
    {
      path: '/quiz', name: 'Quiz', component: QuizPage
    }
  ]
})

createApp(App)
  .use(router)
  .mount('#app')
