import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
      component: () => import("../views/achievementsPage.vue"),
      meta: {
        requiresAuth: true
      }
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

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

routes.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You do not have access");
      next("/");
    }
  } else {
    next();
  }
});
