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
        <RouterLink to="/make-a-booking">Manage Booking</RouterLink>
        <RouterLink to="/support">Guest Support</RouterLink>
        <RouterLink to="/about-us">About Us</RouterLink>
      </nav>
    </main>

    <aside>
      <q-btn flat @click="searchToggle">
        <q-icon name="search" />
      </q-btn>

      <RouterLink to="/language">en</RouterLink>
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
