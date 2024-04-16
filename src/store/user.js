import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useQuizStore } from "./quiz";
import { displayConfetti } from "@/utility";

export const useUserStore = defineStore("user", () => {
  const quizStore = useQuizStore();
  const achievementBadges = ref({
    zeroPointsOnSingleQuiz: {
      id: 1,
      flag: 1
    },
    finishTheQuizOnce: {
      id: 2,
      flag: 1
    },
    untouchable: {
      id: 3,
      flag: 0
    },
    // finish the quiz on a difficulty
    finishTheQuizOnEasy: {
      id: 4,
      flag: 0
    },
    finishTheQuizOnMedium: {
      id: 5,
      flag: 0
    },
    finishTheQuizOnHard: {
      id: 6,
      flag: 0
    }
  });

  const tracker = reactive({
    correctAnswers: 0
  });

  const lives = ref(0);

  function subtractLife() {
    lives.value--;
  }

  function initializeLives() {
    lives.value = 3;
  }

  function finishQuizOnce() {
    if (achievementBadges.value.finishTheQuizOnce.flag === 0) {
      achievementBadges.value.finishTheQuizOnce.flag = 1;
    }
  }

  function finishQuizAnyDifficulty() {
    let { difficulty } = quizStore;
    if (difficulty === "easy") {
      if (achievementBadges.value.finishTheQuizOnEasy.flag === 0) {
        achievementBadges.value.finishTheQuizOnEasy.flag = 1;
      }
    } else if (difficulty === "medium") {
      if (achievementBadges.value.finishTheQuizOnMedium.flag === 0) {
        achievementBadges.value.finishTheQuizOnMedium.flag = 1;
      }
    } else if (difficulty === "hard") {
      if (achievementBadges.value.finishTheQuizOnHard.flag === 0) {
        achievementBadges.value.finishTheQuizOnHard.flag = 1;
      }
    }
  }

  function finishFlawlessly() {
    if (lives.value === 3) {
      if (achievementBadges.value.untouchable.flag === 0) {
        achievementBadges.value.untouchable.flag = 1;
      }
    }
  }

  function checkForPoop() {
    if (achievementBadges.value.zeroPointsOnSingleQuiz.flag === 0) {
      displayConfetti({ emojis: ["💩"] });
      achievementBadges.value.zeroPointsOnSingleQuiz.flag = 1;
      return true;
    }
  }

  return {
    lives,
    achievementBadges,
    tracker,
    subtractLife,
    initializeLives,
    finishQuizOnce,
    finishQuizAnyDifficulty,
    finishFlawlessly,
    checkForPoop
  };
});
