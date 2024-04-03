import JSConfetti from "js-confetti";

export const displayConfetti = (options) => {
  const jsConfetti = new JSConfetti();
  jsConfetti.addConfetti(options);
};
