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
import { useNotification } from "naive-ui";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { useRouter } from "vue-router";
import signIn from "./components/signIn.vue";

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

const errMessages = (err) => {
  switch (err) {
    case "auth/invalid-email":
      errMsg.value = "Invalid email";
      break;
    case "auth/user-not-found":
      errMsg.value = "No account with that email was found";
      break;
    case "auth/wrong-password":
      errMsg.value = "Incorrect password";
      break;
    default:
      errMsg.value = "Email or password is incorrect";
      break;
  }
};

const notification = useNotification();
const handleRegisterWithEmailPassword = async (signUpInfo) => {
  const auth = getAuth();
  try {
    const res = createUserWithEmailAndPassword(
      auth,
      signUpInfo.value.email,
      signUpInfo.value.password
    );
    if (res) {
      welcomeUser(signUpInfo.email);
      router.push("/achievements");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSignInWithEmailPassword = async (logInInfo) => {
  const auth = getAuth();
  try {
    const res = await signInWithEmailAndPassword(
      auth,
      logInInfo.value.email,
      logInInfo.value.password
    );
    if (res) {
      welcomeUser(logInInfo.email);
      router.push("/achievements");
    }
  } catch (error) {
    errMessages(error);
  }
};

const handleSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(getAuth(), provider);
    if (res) {
      welcomeUser(res.user.displayName);
      router.push("/achievements");
    }
  } catch (error) {
    errMessages(error);
  } finally {
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
