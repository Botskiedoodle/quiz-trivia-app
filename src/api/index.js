import axios from "axios";
const baseQuizURL = `https://opentdb.com/api.php?encode=base64`;

export const getQuizQuestions = async (difficulty, amount) => {
  try {
    const { data } = await axios.get(
      `${baseQuizURL}&difficulty=${difficulty}&amount=${amount}`
    );

    return data.results;
  } catch (error) {
    console.log(error);
  }
};

export const getRandomGif = async (result) => {
  let loseArray = ["lose", "cry", "fail", "dumb", "stupid", "stumble", "0"];
  let winArray = ["win", "celebrate", "confetti", "dancing"];
  let searchString = "";
  if (result) {
    const randomIndex = Math.floor(Math.random() * loseArray.length);
    searchString = loseArray[randomIndex];
  } else {
    const randomIndex = Math.floor(Math.random() * winArray.length);
    searchString = winArray[randomIndex];
  }
  let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=3N65mYWlRO6kIeRDAzf7meMhjCM04ToV&q=${searchString}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;
  try {
    const { data } = await axios.get(apiURL);
    const randomIndex = Math.floor(Math.random() * 50);
    return data.data[randomIndex].images.fixed_height;
  } catch (error) {
    console.log(error);
  }
};

export const getLoadingGif = async () => {
  let loadingArray = ["studying", "typing"];
  let searchString = "";
  const randomIndex = Math.floor(Math.random() * loadingArray.length);
  searchString = loadingArray[randomIndex];
  let apiURL = `https://api.giphy.com/v1/gifs/search?api_key=3N65mYWlRO6kIeRDAzf7meMhjCM04ToV&q=${searchString}&limit=50&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

  try {
    const { data } = await axios.get(apiURL);
    const randomIndex = Math.floor(Math.random() * 50);
    return data.data[randomIndex].images.fixed_height;
  } catch (error) {
    console.log(error);
  }
};
