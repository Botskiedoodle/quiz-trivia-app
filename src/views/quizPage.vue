<template>
  <div class="main-quiz">
    <div v-if="gif.loading"><n-spin size="large" /></div>
    <div v-if="quiz.loading && !gif.loading">
      <img
        :src="gif.source"
        :width="gif.width"
        :height="gif.height"
        style="border-radius: 1rem; border: 2px black solid"
      />
      <div style="text-align: center">Fetching Questions...</div>
    </div>

    <div v-else-if="!quiz.loading">
      <header class="question-progress">
        Question {{ quiz.answered + 1 }} of {{ quiz.content.length }}
      </header>
      <div
        v-for="(quizItem, questionIndex) in quiz.content"
        :key="quizItem.question"
        class="app-container"
        v-show="quiz.answered === questionIndex"
      >
        <div class="question-container">
          <div class="question">
            {{ quizItem.question }}
          </div>
        </div>
        <div class="controls-container">
          <div class="answers">
            <div
              v-for="answer in quizItem.answers"
              :key="answer"
              @click="pickAnswer(quizItem.correct_answer, answer)"
            >
              <n-button
                :type="buttonType(quizItem.correct_answer, answer)"
                class="answer button"
                size="large"
              >
                {{ answer }}
              </n-button>
            </div>
          </div>
          <div class="controls">
            <div class="hud">
              <div class="difficulty">
                Difficulty: {{ quizStore.difficulty }}
              </div>
              <n-result :status="result.status" size="medium" />
              <div class="user-lives" v-if="userStore.lives != 0">
                <img
                  v-for="life in userStore.lives"
                  :key="life"
                  src="../assets/heart.png"
                  width="40"
                  alt="user life"
                />
              </div>
              <div v-else>
                <img src="../assets/grave.png" alt="grave" width="70" />
              </div>
            </div>
            <div class="buttons">
              <n-button @click="quitQuiz" type="error" class="control button">
                <!-- Quit -->
                <n-icon size="1.5rem">
                  <exit-outline />
                </n-icon>
              </n-button>
              <n-button
                type="success"
                @click="nextQuestion()"
                class="control button"
              >
                <!-- {{ result.buttonText }} -->
                <n-icon size="1.5rem">
                  <play-skip-forward />
                </n-icon>
              </n-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { NButton, useDialog, NResult, NIcon, NSpin } from "naive-ui";
import { reactive, onMounted, onUpdated, ref } from "vue";
import { useRouter } from "vue-router";
import { PlaySkipForward, ExitOutline } from "@vicons/ionicons5";

import { getQuizQuestions } from "@/api";

import { useQuizStore } from "@/store/quiz.js";
const quizStore = useQuizStore();

import { useUserStore } from "@/store/user.js";
const userStore = useUserStore();

const router = useRouter();

const dialog = useDialog();

const buttonType = (correctAnswer, answer) => {
  if (!quiz.notAnswered) {
    if (answer === correctAnswer) {
      return "success";
    } else if (quiz.pickedAnswer === answer) {
      return "error";
    } else {
      return "info";
    }
  } else {
    return "info";
  }
};

const pickAnswer = (correctAnswer, userAnswer) => {
  if (quiz.notAnswered === true) {
    dialog.warning({
      title: "Confirm Answer",
      content: "Is that your final answer?",
      positiveText: "Yes",
      negativeText: "Not Sure",
      onPositiveClick: () => {
        quiz.pickedAnswer = userAnswer;
        if (userAnswer === correctAnswer) {
          quiz.correct++;
          quizStore.addCorrect();
          result.status = "success";
        } else {
          result.status = "error";
          userStore.subtractLife();
        }
        quiz.notAnswered = false;

        if (userStore.lives === 0 || quiz.answered === quizStore.amount - 1) {
          result.buttonText = "Finish Quiz";
        } else {
          result.buttonText = "Next Question";
        }
      },
      onNegativeClick: () => {}
    });
  }
};

const result = reactive({
  status: "404",
  title: "Correct!",
  buttonText: "Skip"
});

const proceedToNext = () => {
  if (userStore.lives === 0) {
    router.push("/quiz-finished");
  }
  quiz.answered++;
  quiz.notAnswered = true;
  result.status = "404";
  quiz.pickedAnswer = "";
  if (quiz.answered === quizStore.amount - 1 || userStore.lives === 0) {
    result.buttonText = "Finish Quiz";
  } else {
    result.buttonText = "Skip";
  }
  if (quiz.answered == quizStore.amount) {
    // quiz is finished
    userStore.finishFlawlessly();
    userStore.finishQuizOnce();
    userStore.finishQuizAnyDifficulty();
    router.push("/quiz-finished");
  }
};

const nextQuestion = () => {
  let content = ref("");
  if (userStore.lives === 1) {
    content.value =
      "You only have one life left! This move will cost you a life and fail the quiz. Are you sure you want to proceed?";
  } else {
    content.value =
      "Are you sure you want to skip this question? This would cost you a life.";
  }
  if (quiz.notAnswered == true) {
    dialog.warning({
      title: "Skip Question",
      content: content.value,
      positiveText: "Yes",
      negativeText: "No",
      onPositiveClick: () => {
        userStore.subtractLife();

        if (userStore.lives === 0) {
          if (quiz.correct === 0) {
            userStore.checkForPoop();
            console.log("poopy");
          }
          router.push("/quiz-finished");
        } else {
          proceedToNext();
        }
      }
    });
  } else {
    proceedToNext();
  }
};

const quiz = reactive({
  pickedAnswer: "",
  notAnswered: true,
  correct: 0,
  answered: 0,
  loading: "",
  content: []
});

const randomizedAnswers = (correctAnswer, incorrectAnswers) => {
  let incorrect_answers = incorrectAnswers;
  let correct_answer = correctAnswer;
  let randomIndex = Math.floor(Math.random() * (incorrect_answers.length + 1));
  incorrect_answers.splice(randomIndex, 0, correct_answer);
  return incorrect_answers;
};

const getQuiz = async () => {
  try {
    // quiz.loading = true;

    const { difficulty, amount } = quizStore;
    const quizResponse = await getQuizQuestions(difficulty, amount);

    quizResponse.forEach((obj) => {
      for (let prop in obj) {
        if (Array.isArray(obj[prop])) {
          obj[prop] = obj[prop].map((item) => atob(item));
        } else {
          obj[prop] = atob(obj[prop]);
        }
      }
    });

    quizResponse.forEach((question) => {
      if (question.type === "multiple") {
        question.answers = randomizedAnswers(
          question.correct_answer,
          question.incorrect_answers
        );
      } else {
        question.answers = ["True", "False"];
      }
    });

    quiz.content = [...quizResponse];
  } catch (error) {
    console.error(error);
  } finally {
    quiz.loading = false;
  }
};

const quitQuiz = () => {
  dialog.warning({
    title: "Quit Quiz",
    content:
      "Are you sure you want to quit this quiz and return to home screen? Your progress will not be saved.",
    positiveText: "Yes",
    negativeText: "No",
    onPositiveClick: () => {
      router.push("/");
    }
  });
};

import { getLoadingGif } from "@/api";
const gif = reactive({
  height: "",
  width: "",
  source: "",
  loading: true
});

const getGif = async () => {
  try {
    gif.loading = true;
    const fetchedGIF = await getLoadingGif();
    gif.source = fetchedGIF.url;
    gif.width = fetchedGIF.width;
    gif.height = fetchedGIF.height;
  } catch (error) {
    console.log(error);
  } finally {
    gif.loading = false;
  }
};

onUpdated(() => {});
const Init = () => {
  quiz.loading = true;
  getGif();
  setTimeout(getQuiz, 2000);
  // getQuiz();
};
onMounted(() => {
  Init();
  userStore.initializeLives();
  quizStore.initializeQuiz();
});
</script>
<style lang="scss" scopedSlots>
.main-quiz {
  .question-progress {
    font-size: x-large;
    font-weight: 600;
    text-align: center;
  }
}

.button {
  transition: 0.3s all;

  &:hover {
    transform: scale(1.1);
  }
}

.app-container {
  padding: 1rem;

  .question-container {
    padding: 1rem;
    background-color: hsl(180, 100%, 10%);
    border-radius: 1rem;

    .question {
      color: white;
    }
  }

  .controls-container {
    .answers {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .answer {
        width: 100%;
      }
    }

    .controls {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: hsl(180, 100%, 10%);

      border-radius: 1rem;
      gap: 1rem;

      @media screen and (min-width: 768px) {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        // gap: 4rem;
      }

      .buttons {
        display: flex;
        gap: 0.75rem;

        @media screen and (min-width: 768px) {
          display: flex;
          flex-direction: column-reverse;

          .control {
            width: 10rem;
            height: 4rem;
          }
        }

        .control {
          width: 5rem;
        }
      }

      .hud {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: center;

        .difficulty {
          color: white;
        }

        .user-lives {
          display: flex;
          gap: 0.5rem;
        }
      }
    }
  }
}
</style>
