<template>
    <div>
        <div class="main">
            <n-result title="Out of bounds. Here have some tea." status="418" />
            <n-button @click="goHome" type="info">Return to Home Page</n-button>
        </div>
    </div>
</template>
<script setup>
import { NResult, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
    router.push('/')
}
</script>
<style lang="scss"></style>