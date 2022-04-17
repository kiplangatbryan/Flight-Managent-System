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
</style>
