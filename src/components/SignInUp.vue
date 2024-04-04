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
                  v-model="logInInfo.email"
                  placeholder="Enter Email Address"
                  maxlength="50"
                />
              </n-form-item-row>
              <n-form-item-row label="Password">
                <n-input
                  type="password"
                  v-model="logInInfo.password"
                  placeholder="Enter Password"
                  maxlength="20"
                  show-password-on="click"
                />
              </n-form-item-row>
            </n-form>
            <n-button type="primary" block secondary strong> Sign In </n-button>
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
              <n-form-item-row label="Reenter Password">
                <n-input />
              </n-form-item-row>
            </n-form>
            <n-button
              type="primary"
              block
              secondary
              strong
              @click="handleRegisterWithEmailPassword"
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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";
const router = useRouter();
const show = defineModel("show");
const auth = getAuth();
const logInInfo = ref({
  email: "",
  password: "",
  confirmPassword: ""
});

const handleRegisterWithEmailPassword = () => {
  console.log(logInInfo.value);
  createUserWithEmailAndPassword(
    auth,
    logInInfo.value.email,
    logInInfo.value.password
  ).then((response) => {
    console.log("Successfully Signed In!");
    router.push("/achievements");
  });
};
</script>

<style lang="scss" scoped></style>
