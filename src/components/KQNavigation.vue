<script>
import { RouterLink } from "vue-router";
import { useAppStore } from "@/stores/main";

export default {
  setup() {
    const store = useAppStore();

    const { searchToggle } = store;

    return {
      searchToggle,
    };
  },
};
</script>

<template>
  <header>
    <main class="row items-center">
      <main class="logo-text text-white q-mr-lg">Kenya <b>Airways</b></main>
      <nav>
        <RouterLink to="/">Book Flight</RouterLink>
        <RouterLink to="/make-a-booking">Booking</RouterLink>
        <RouterLink to="/support">Guest Support</RouterLink>
        <RouterLink to="/about-us">About Us</RouterLink>
      </nav>
    </main>

    <aside class="row justify-between items-center q-gutter-sm">
      <div class="col">
        <q-btn flat @click="searchToggle" class="fix" icon="search"></q-btn>
      </div>
      <div class="col">
        <q-btn
          class="col"
          to="/contact-us"
          label="Talk to us"
          no-caps
          glossy
          color="primary"
        >
        </q-btn>
      </div>
    </aside>
  </header>
</template>

<style scoped>
header {
  display: flex;
  align-items: center;
  padding: 0.4rem 0 1em 0;
  justify-content: space-between;
}

.logo-text {
  font-size: 20px;
  margin-top: 15px;
}

.fix {
  margin-top: 14px;
}
aside {
  min-width: 200px;
}
aside * {
  color: #fff;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  font-size: 1rem;
  border-left: 1px solid var(--color-border);
  color: #eee;
}

nav a:first-of-type {
  border: 0;
}
</style>
