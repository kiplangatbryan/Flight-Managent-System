<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />
</template>

<style>
@import "@/assets/base.css";
@import "@/assets/animate.css";

#app {
  margin: 0 auto;
  font-weight: normal;
}

.bg-accent-kq {
  background: var(--main-accent-color) !important;
}

.container {
  padding: 0 10em;
}


/* responsive adjustments */

@media (max-width: 1300px) {
    .container {
  padding: 0 5em;
     
    }
}

@media (max-width: 1200px) {
    .container {
      padding: 0 2em;
     
    }
}

@media (max-width: 600px) {
    .container {
      padding: 0;
     
    }
}


</style>
