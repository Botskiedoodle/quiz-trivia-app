<template>
  <n-form :ref="signUpFormRef" :rules="signUpRules" :model="signUpInfo">
    <n-form-item label="Email Address" path="email">
      <n-input
        type="text"
        v-model:value="signUpInfo.email"
        placeholder="Enter Email Address"
        maxlength="50"
      />
    </n-form-item>
    <n-form-item label="Password" path="password">
      <n-input
        type="password"
        v-model:value="signUpInfo.password"
        placeholder="Enter Password"
        maxlength="20"
        show-password-on="click"
      />
    </n-form-item>
    <n-form-item label="Confirm Password" path="confirmPassword">
      <n-input
        type="password"
        v-model:value="signUpInfo.confirmPassword"
        placeholder="Confirm Password"
        maxlength="20"
        show-password-on="click"
      />
    </n-form-item>
  </n-form>
  <n-button
    type="primary"
    block
    secondary
    strong
    @click="handleSignUpWithEmail"
    :loading="loading.email"
  >
    Sign up
  </n-button>
</template>

<script setup>
import { reactive, ref, defineEmits } from "vue";
const emit = defineEmits(["signUpWithEmail"]);
const signUpFormRef = ref();
const signUpInfo = reactive({
  email: "",
  password: "",
  confirmPassword: ""
});

const validatePasswordStartsWith = (rule, value) => {
  return (
    !!signUpInfo.password &&
    signUpInfo.password.startsWith(value) &&
    signUpInfo.password.length >= value.length
  );
};

const validatePasswordSame = (rule, value) => {
  return value === signUpInfo.password;
};
const signUpRules = {
  email: {
    required: true,
    message: "Please input your email address",
    trigger: "blur"
  },
  password: [
    {
      required: true,
      message: "Please input your password",
      trigger: ["input", "blur"]
    },
    {
      validator: checkPasswordLength,
      message: "Password must be 8 characters long.",
      trigger: ["input", "blur"]
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: "Please re-enter password!",
      trigger: ["input", "blur"]
    },
    {
      validator: validatePasswordStartsWith,
      message: "Password is not the same as re-entered password!",
      trigger: "input"
    },
    {
      validator: validatePasswordSame,
      message: "Password is not the same as re-entered password!",
      trigger: ["blur", "password-input"]
    }
  ]
};

const handleSignUpWithEmail = async () => {
  try {
    loading.email = true;
    await signUpFormRef.value?.validate((e) => {
      if (!e) {
        emit("signUpWithEmail", signUpInfo);
      } else {
        console.log(e);
      }
    });
  } catch (error) {
    console.log(error);
  } finally {
    loading.email = false;
  }
};
</script>

<style lang="scss" scoped></style>
