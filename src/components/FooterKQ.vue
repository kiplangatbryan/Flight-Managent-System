<template>
  <main>
    <div class="text-h5 q-pb-lg">Kenya Airways</div>

    <img class="fly-plane" src="@/assets/plane.png" alt="" />

    <div class="row">
      <div class="main-links">
        <div class="text-h6 text-grey-4">Main</div>
        <div class="q-pb-lg column">
          <router-link class="route-" to="/">Home</router-link>
          <router-link class="route-" to="/">Manage FLights</router-link>
          <router-link class="route-" to="/">Book Now</router-link>
          <router-link class="route-" to="/">Talk to us</router-link>
        </div>
      </div>

      <div>
        <div class="text-h6 text-grey-4">Get Help</div>
        <div class="q-pb-lg column">
          <router-link class="route-" to="/"
            >How to book a Flight ?</router-link
          >
          <router-link class="route-" to="/"
            >Change Flight Informaton ?</router-link
          >
          <router-link class="route-" to="/"
            >How to Cancel a Flight ?</router-link
          >
          <router-link class="route-" to="/"
            >How to Request a Refund ?</router-link
          >
        </div>
      </div>
    </div>
    <hr class="q-my-md" />
    <div class="row justify-between items-center cpy-segment">
      <div class="fore-links">
        <router-link class="fore-link q-pl-none" to="#">Legal</router-link>
        <router-link class="fore-link" to="#">privacy</router-link>
        <router-link class="fore-link" to="#">Accessibility</router-link>
        <router-link class="fore-link" to="#">Cookie Policy</router-link>
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
  background: var(--main-accent-color);
  color: #f9f7f7;
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
}
.fore-link,
.copy {
  font-size: 16px;
}
.copy {
  margin-top: 8px;
}
</style>
