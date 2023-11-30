<template>
  <div>
    <n-modal v-model:show="isVisible" :mask-closable="false">
      <n-card :bordered="true" size="huge" role="dialog" style="width: 20rem;  ">
        <n-result :status="status" :title="title">
          <template #footer>
            <n-button @click="next">{{ buttonText }}</n-button>
          </template>
        </n-result>
      </n-card>
    </n-modal>
  </div>
</template>
<script setup>
import { NModal, NResult, NButton, NCard } from 'naive-ui'
import { ref, onUpdated } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: 'success'
  },
  title: {
    type: String,
    default: 'Success'
  },
  buttonText: {
    type: String,
    default: 'Next'
  }
})
const emits = defineEmits(['proceed'])
const next = () => {
  emits('proceed')
}
const isVisible = ref(false)

onUpdated(() => {
  isVisible.value = props.visible
})
</script>
<style></style>