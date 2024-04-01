import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";

import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/homePage.vue";
import AchievementsPage from "@/views/achievementsPage.vue";
import QuizPage from "@/views/quizPage.vue";
import FinishQuiz from "@/views/finish.vue";
import notFound from "@/views/notFound.vue";

import { createPinia } from "pinia";
const pinia = createPinia();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomePage
    },
    {
      path: "/achievements",
      name: "Achievements",
      component: AchievementsPage
    },
    {
      path: "/quiz",
      name: "Quiz",
      component: QuizPage
    },
    {
      path: "/quiz-finished",
      name: "Finish",
      component: FinishQuiz
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: notFound
    }
  ]
});

createApp(App).use(router).use(pinia).mount("#app");
