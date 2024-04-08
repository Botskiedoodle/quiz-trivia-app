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
            <n-form>
              <n-form-item-row label="Email Address">
                <n-input
                  type="text"
                  v-model:value="logInInfo.email"
                  placeholder="Enter Email Address"
                  maxlength="50"
                />
              </n-form-item-row>
              <n-form-item-row label="Password">
                <n-input
                  type="password"
                  v-model:value="logInInfo.password"
                  placeholder="Enter Password"
                  maxlength="20"
                  show-password-on="click"
                />
              </n-form-item-row>
            </n-form>
            <div v-if="errMsg">{{ errMsg }}</div>
            <div class="cta-container">
              <n-button
                type="primary"
                block
                secondary
                strong
                :disabled="loading.google"
                :loading="loading.email"
                @click="handleSignInWithEmailPassword"
              >
                Sign In
              </n-button>
              <n-button
                type="primary"
                block
                secondary
                strong
                :disabled="loading.email"
                :loading="loading.google"
                @click="handleSignInWithGoogle"
              >
                Sign In With Google
              </n-button>
            </div>
          </n-tab-pane>
          <n-tab-pane name="signup" tab="Sign up">
            <n-form>
              <n-form-item-row label="Email Address">
                <n-input
                  type="text"
                  v-model:value="logInInfo.email"
                  placeholder="Enter Email Address"
                  maxlength="50"
                />
              </n-form-item-row>
              <n-form-item-row label="Password">
                <n-input
                  type="password"
                  v-model:value="logInInfo.password"
                  placeholder="Enter Password"
                  maxlength="20"
                  show-password-on="click"
                />
              </n-form-item-row>
              <n-form-item-row label="Confirm Password">
                <n-input />
              </n-form-item-row>
            </n-form>
            <n-button
              type="primary"
              block
              secondary
              strong
              @click="handleRegisterWithEmailPassword"
              :loading="loading.email"
            >
              Sign up
            </n-button>
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
const router = useRouter();
const show = defineModel("show");
const errMsg = ref("");
const loading = reactive({
  email: false,
  google: false
});
const logInInfo = reactive({
  email: "",
  password: "",
  confirmPassword: ""
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
const handleRegisterWithEmailPassword = async () => {
  const auth = getAuth();
  try {
    loading.email = true;
    const res = await createUserWithEmailAndPassword(
      auth,
      logInInfo.email,
      logInInfo.password
    );
    if (res) {
      welcomeUser(logInInfo.value.email);
      router.push("/achievements");
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.email = false;
  }
};

const handleSignInWithEmailPassword = async () => {
  const auth = getAuth();
  try {
    loading.email = true;

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
    errMessages(error);
  } finally {
    loading.email = false;
  }
};

const handleSignInWithGoogle = async () => {
  try {
    loading.google = true;
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(getAuth(), provider);
    if (res) {
      // console.log(res.user.displayName, "asdf");
      welcomeUser(res.user.displayName);
      router.push("/achievements");
    }
  } catch (error) {
    errMessages(error);
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
