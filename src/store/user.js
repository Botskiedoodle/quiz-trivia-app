import { ref, reactive } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
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
    correctAnswers: {
      general: 0,
      trueOrFalse: 0
    }
  });

  const lives = ref(0);

  function subtractLife() {
    lives.value--;
  }

  function initializeLives() {
    lives.value = 3;
  }

  return { lives, subtractLife, initializeLives, achievementBadges, tracker };
});
