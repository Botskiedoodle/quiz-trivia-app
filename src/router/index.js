import { createRouter, createWebHistory } from "vue-router";

import HomePage from "@/views/homePage.vue";

export const routes = createRouter({
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
      component: () => import("../views/achievementsPage.vue")
    },
    {
      path: "/quiz",
      name: "Quiz",
      component: () => import("../views/quizPage.vue")
    },
    {
      path: "/quiz-finished",
      name: "Finish",
      component: () => import("../views/finishPage.vue")
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("../views/notFound.vue")
    }
  ]
});
