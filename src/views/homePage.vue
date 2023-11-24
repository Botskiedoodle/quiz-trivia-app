<template>
  <div>
    <n-space justify="center">
      <div class="home">
        <div class="title">
          Greatest Quiz App Ever
        </div>
        <div>
          Sign in to save your progress!
        </div>
        <div style="margin-top: 1rem">
          <n-space vertical align="center">
            <n-input round placeholder="Username" :maxlength="8" style="width: 16rem" />
            <n-input round type="password" show-password-on="mousedown" placeholder="Password" :maxlength="8"
              style="width: 16rem" />

            <n-button type="info">Log in</n-button>

          </n-space>
        </div>
        <div>
          Or login with your google account!
        </div>
        <div>
          <n-button circle type="warning">
            <template #icon>
              <n-icon>
                <google />
              </n-icon>
            </template>
          </n-button>
        </div>
      </div>
    </n-space>

  </div>
</template>
<script setup>
import { NSpace, NButton, NInput, NIcon } from 'naive-ui'
import { Google } from '@vicons/fa'
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  .title {
    font-size: 3rem;
    font-weight: 700;
    color: black;
    padding-top: 8rem;
  }
}
</style>