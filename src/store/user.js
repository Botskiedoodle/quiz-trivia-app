import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useQuizStore } from "./quiz";
import { displayConfetti } from "@/utility";

export const useUserStore = defineStore("user", () => {
  const quizStore = useQuizStore();
  const achievementBadges = ref({
    zeroPointsOnSingleQuiz: {
      flag: 0,
      image: "poop",
      title: "Stinky",
      description:
        "Failed the quiz with 0 correct answers. Congratulations, stinky. Maybe next time you'll smell success."
    },
    finishTheQuizOnce: {
      flag: 0,
      image: "finish",
      title: "Finisher",
      description:
        "Completed the quiz once on whichever difficulty. Wow, you really went all the way, didn't you? Maybe next time try something a bit more challenging, like tying your shoes without assistance."
    },
    // fiftyFiftyMaster: 0,
    untouchable: {
      flag: 0,
      image: "untouchable",
      title: "Flawless",
      description: `Completed the quiz once with 3 hearts intact. Impressive! Nerd. `
    },
    // finish the quiz on a difficulty
    finishTheQuizOnEasy: {
      flag: 0,
      image: "easy",
      title: "Piece of cake",
      description:
        "Congratulations, you've achieved the bare minimum! Hope you enjoyed your leisurely stroll through the land of the obvious. Next stop: Advanced mediocrity."
    },
    finishTheQuizOnMedium: {
      flag: 0,
      image: "meh",
      title: "Meh",
      description: `Your lukewarm enthusiasm for adequacy is truly inspiring. Don't let anyone tell you that being just okay isn't worth celebrating."`
    },
    finishTheQuizOnHard: {
      flag: 0,
      image: "hard",
      title: "You Go Hard",
      description:
        "You can now boast about your marginally above-average skills. Bragging rights await you in the realm of the moderately competent. Just remember, there's always someone out there who's slightly better, but they're probably not as good-looking as you."
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
