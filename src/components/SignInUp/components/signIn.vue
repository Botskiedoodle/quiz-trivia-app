<template>
  <n-form ref="logInFormRef" :rules="logInRules" :model="logInInfo">
    <n-form-item label="Email Address" path="email">
      <n-input
        type="text"
        v-model:value="logInInfo.email"
        :disabled="loading.google"
        placeholder="Enter Email Address"
        maxlength="50"
      />
    </n-form-item>
    <n-form-item label="Password" path="password">
      <n-input
        type="password"
        v-model:value="logInInfo.password"
        :disabled="loading.google"
        placeholder="Enter Password"
        maxlength="20"
        show-password-on="click"
      />
    </n-form-item>
  </n-form>

  <div class="cta-container">
    <n-button
      type="primary"
      block
      secondary
      strong
      :loading="loading.email"
      :disabled="loading.google"
      round
      @click="handleSignInWithEmailPassword"
    >
      Sign In
    </n-button>

    <n-button
      type="primary"
      block
      strong
      round
      :disabled="loading.email"
      :loading="loading.google"
      @click="handleSignInWithGoogle"
    >
      <template #icon>
        <n-icon size="1.5rem">
          <logo-google />
        </n-icon>
      </template>
      Sign In With Google
    </n-button>
  </div>
</template>

<script setup>
import { ref, reactive, defineEmits, defineModel } from "vue";
import { useRouter } from "vue-router";
import { useNotification } from "naive-ui";
import { LogoGoogle } from "@vicons/ionicons5";

const router = useRouter();
const loading = defineModel("loading");

const logInFormRef = ref();
const logInInfo = reactive({
  email: "",
  password: ""
});

const checkPasswordLength = (rule, value) => {
  return value.length >= 8;
};

const logInRules = {
  email: {
    required: true,
    message: "Please input your email address",
    trigger: "blur"
  },
  password: [
    {
      required: true,
      message: "Please input your password",
      trigger: "blur"
    },
    {
      validator: checkPasswordLength,
      message: "Password must be atleast 8 characters long.",
      trigger: ["input", "blur"]
    }
  ]
};

const emit = defineEmits(["signIn", "googleSignIn"]);

const handleSignInWithEmailPassword = async () => {
  try {
    await logInFormRef.value?.validate((e) => {
      if (!e) {
        emit("signIn", logInInfo);
      } else {
        console.log(e);
      }
    });
  } catch (error) {
    console.log(e);
  }
};

const handleSignInWithGoogle = () => {
  try {
    emit("googleSignIn");
  } catch (error) {
    console.log(error);
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
