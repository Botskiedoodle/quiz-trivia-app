<template>
  <div>
    <div class="achievement" v-if="flag === 1">
      <img width="60" :src="imageURL" />
      <span class="achievement-title">{{ title }}</span>
    </div>
    <div v-else class="achievement">
      <img width="60" src="../../assets/lock.png" alt="" />
      <span class="achievement-title"></span>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  flag: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: "lock"
  },
  title: {
    type: String,
    default: ""
  }
});

const imageURL = computed(() => {
  return new URL(
    `../../assets/achievements/${props.image}.png`,
    import.meta.url
  ).href;
});
</script>

<style lang="scss" scoped>
.achievement {
  width: 7rem;

  // border: 1px solid blue;
  display: grid;
  place-items: center;
  .achievement-title {
    font-weight: 600;
  }
}
</style>
