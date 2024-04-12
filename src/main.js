import { createApp } from "vue";
// import './style.css'
import App from "./App.vue";

import { routes } from "@/router";
import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import Naive from "naive-ui";

import { createPinia } from "pinia";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaz50RoLxQXDspwqYyN1UW-efMqRdhEVc",
  authDomain: "vue-quiz-app-f95d9.firebaseapp.com",
  projectId: "vue-quiz-app-f95d9",
  storageBucket: "vue-quiz-app-f95d9.appspot.com",
  messagingSenderId: "971340143875",
  appId: "1:971340143875:web:6135adf35aee77e4c41d36"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(routes)
  .use(Naive)
  .use(Particles, {
    init: async (engine) => {
      await loadSlim(engine);
    }
  })
  .mount("#app");
