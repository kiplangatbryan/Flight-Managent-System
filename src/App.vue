<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  margin: 0 auto;
  font-weight: normal;
}

.bg-accent-kq {
  background: var(--main-accent-color) !important;
}

.fade-enter-active,
.fade-enter-leave {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-enter-to {
  opacity: 0;
}
</style>
