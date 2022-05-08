<template>
  <div class="shadow-1 bg-grey-3 custom-card" :class="{ active: active }">
    <div class="text-h6 b-title">{{ date }}</div>
    <div class="subtitle-text3 b-text" v-if="!btn">from {{ currency }}</div>
    <div class="subtitle-text3 b-text" v-if="btn">next</div>

    <div class="text-h6 b-title">
      {{ price }}
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  props: ["price", "date", "currency", "active", "btn"],
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style lang="css" scoped>
.custom-card {
  border-radius: 4px;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;
  padding: 0.5em 0.5em;
  min-width: 80px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.custom-card:hover {
  transform: scale(1.1);
  background: #fff !important;
  border: 0.25px solid var(--main-accent-color);
}

.active {
  border: 0.25px solid #000;
  background: #fff !important;
  transform: scale(1.1);
}
.b-text {
  font-size: 14px !important;
}
.b-title {
  font-size: 16px !important;
}
</style>
