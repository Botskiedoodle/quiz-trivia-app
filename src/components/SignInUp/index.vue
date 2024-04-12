<template>
  <div>
    <n-modal v-model:show="show">
      <n-card style="width: 24rem">
        <n-tabs
          class="card-tabs"
          default-value="signin"
          size="large"
          animated
          pane-wrapper-style="margin: 0 -4px"
          pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
        >
          <n-tab-pane name="signin" tab="Sign in">
            <sign-in
              @signIn="handleSignInWithEmailPassword"
              @googleSignIn="handleSignInWithGoogle"
              v-model:loading="loading"
            />
          </n-tab-pane>
          <n-tab-pane name="signup" tab="Sign up">
            <sign-up @signUpWithEmail="handleRegisterWithEmailPassword" />
          </n-tab-pane>
        </n-tabs>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup>
import { defineModel, reactive, ref } from "vue";
import { useNotification, useMessage } from "naive-ui";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { useRouter } from "vue-router";
import SignIn from "./components/SignIn.vue";
import SignUp from "./components/SignUp.vue";
const message = useMessage();
const router = useRouter();
const show = defineModel("show");

const loading = reactive({
  email: false,
  google: false
});

const welcomeUser = (name = "guest!") => {
  notification.success({
    title: "Sign in successful!",
    content: `Welcome ${name}!`,
    duration: 3000
  });
};

const errMsg = ref("");

const errMessages = (err) => {
  switch (err) {
    case "auth/invalid-email":
      errMsg.value = "Invalid user account";
      break;
    case "auth/user-not-found":
      errMsg.value = "No account with that email was found";
      break;
    case "auth/invalid-credential":
      errMsg.value = "Incorrect password";
      break;
    case "auth/email-already-in-use":
      errMsg.value = "Account already in use";
      break;
    case "auth/too-many-requests":
      errMsg.value = "Too many log in request. Please try again later.";
      break;
    default:
      errMsg.value = "Email or password is incorrect";
      break;
  }
};

const notification = useNotification();
const handleRegisterWithEmailPassword = async (signUpInfo) => {
  console.log(signUpInfo.email, "info for sign up");
  const auth = getAuth();
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      signUpInfo.email,
      signUpInfo.password
    );
    if (res) {
      welcomeUser(signUpInfo.email);
      router.push("/achievements");
    }
  } catch (error) {
    errMessages(error.code);
    message.warning(errMsg.value);
  }
};

const handleSignInWithEmailPassword = async (logInInfo) => {
  const auth = getAuth();
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      logInInfo.email,
      logInInfo.password
    );
    if (res) {
      welcomeUser(logInInfo.email);
      router.push("/achievements");
    }
  } catch (error) {
    errMessages(error.code);
    message.warning(errMsg.value);
  }
};

const handleSignInWithGoogle = async () => {
  loading.google = true;
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(getAuth(), provider);
    if (res) {
      welcomeUser(res.user.displayName);
      router.push("/achievements");
    }
  } catch (error) {
    errMessages(error);
    message.warning(errMsg.value);
  } finally {
    loading.google = false;
  }
};
</script>

<style lang="scss" scoped>
.cta-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
