<script setup>
import { useAppStore } from "@/stores/main";

const store = useAppStore();

const { searchToggle } = store;
</script>

<template>
  <header>
    <main class="row items-center">
      <div class="toggle-nav">
        <q-btn
          flat
          to="/make-a-booking"
          @click="toggleNav"
          class="fix"
          icon="menu"
          size="xl"
        ></q-btn>
      </div>
      <main class="logo-text text-white q-mr-lg">Dooley <b>Airways</b></main>
      <nav class="k-navigation">
        <RouterLink to="/">Book Flight</RouterLink>
        <RouterLink to="/make-a-booking">Booking</RouterLink>
      </nav>
    </main>

    <aside class="row justify-between items-center q-gutter-sm">
      <div class="col k-search-btn">
        <q-btn
          flat
          to="/make-a-booking"
          rounded
          @click="searchToggle"
          class="fix"
          icon="search"
        ></q-btn>
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

.toggle-nav {
  display: none;
}
@media (max-width: 700px) {
  .k-navigation,
  .k-search-btn {
    display: none;
  }

  .toggle-nav {
    display: block;
  }
  aside {
    min-width: unset !important;
  }
}

@media (max-width: 600px) {
  header {
    padding: 0px 1em 0 10px !important;
    margin: 0 !important;
  }

 
  
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
