<template>
  <main>
    <q-separator class="q-mb-lg" />

    <div class="text-h5 text-center">Kenya Airways</div>

    <div class="row justify-between items-center cpy-segment">
      <div class="fore-links">
        <router-link class="fore-link q-pl-none" to="#">Accessibility</router-link>
        <router-link class="fore-link" to="#">Cookie Policy</router-link>
        <router-link class="fore-link " to="#">Help</router-link>
        <router-link class="fore-link" to="#">Contact Us</router-link>
      </div>
      <div class="copy">
        &copy; {{ new Date().getFullYear() }} | kenya Airways
      </div>
    </div>
  </main>
</template>

<script>
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log("mounted");
    });

    return {};
  },
};
</script>

<style scoped>
main {
  padding: 3em 10em 1em 10em;
  position: relative;
}

.main-links {
  margin-right: 6em;
}

.fly-plane {
  position: absolute;
  right: 10%;
  top: -20%;
  width: 600px;
}
.route- {
  font-size: 16px;
  margin-bottom: -5px;
  border-left: unset;
  margin-left: unset;
}
.fore-link,
.copy {
  color: unset;
  font-size: 16px;
}
.copy {
  margin-top: 8px;
}
</style>
