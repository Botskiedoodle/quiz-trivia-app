import { useQuizStore } from "@/store/quiz.js";
const quizStore = useQuizStore();
import { useUserStore } from "@/store/user.js";
const userStore = useUserStore();

let { achievementBadges } = userStore;
let { difficulty } = quizStore;

export const finishQuizAnyDifficulty = () => {
  if (difficulty === "easy") {
    if (achievementBadges.finishTheQuizOnEasy.flag === 0) {
      userStore.achievementBadges.finishTheQuizOnEasy.flag = 1;
    }
  } else if (difficulty === "medium") {
    if (achievementBadges.finishTheQuizOnMedium.flag === 0) {
      userStore.achievementBadges.finishTheQuizOnMedium.flag = 1;
    }
  } else if (difficulty === "hard") {
    if (achievementBadges.finishTheQuizOnHard.flag === 0) {
      userStore.achievementBadges.finishTheQuizOnHard.flag = 1;
    }
  }
};

export const finishQuizOnce = () => {
  if (achievementBadges.finishTheQuizOnce.flag === 0) {
    userStore.achievementBadges.finishTheQuizOnce.flag = 1;
  }
};

export const finishFlawlessly = () => {
  if (userStore.lives === 3) {
    if (achievementBadges.untouchable.flag === 0) {
      userStore.achievementBadges.untouchable.flag = 1;
    }
  }
};

export const checkForPoop = () => {
  if (achievementBadges.zeroPointsOnSingleQuiz.flag === 0) {
    userStore.achievementBadges.zeroPointsOnSingleQuiz.flag = 1;
  }
};
