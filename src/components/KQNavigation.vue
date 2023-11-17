<script setup>
import { useAppStore } from "@/stores/main";

const store = useAppStore();

const { searchToggle } = store;
</script>

<template>
  <header class="k-header bg-white container">
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
      <main class="logo-text text-uppercase text-bold  q-mr-lg">Dooley Airways</main>
      <nav class="k-navigation">
        <RouterLink to="/">Travel</RouterLink>
        <RouterLink to="/make-a-booking">Deals</RouterLink>
      </nav>
    </main>

  </header>
</template>

<style scoped>
.k-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 10rem 1rem 10rem;
  right: 0;
  left: 0;
  z-index: 1000;
  box-shadow: 0 1px 20px #7d7c7c6e;
}


/* responsive adjustments */

@media (max-width: 1300px) {
    .k-header {
   padding: 0.4rem 5rem 1rem 5rem;

     
    }
}

@media (max-width: 1200px) {
    .k-header {
       padding: 0.4rem 2rem 1rem 2rem;

     
    }
}

@media (max-width: 600px) {
    .k-header {
       padding: 0.4rem 1rem 1rem 1rem;

     
    }
}



.logo-text {
  margin-top: 15px;
  letter-spacing: 1px;
  color: var(--main-color);
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

a,
.green {
  text-decoration: none;
  color: var(--main-color);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
       color: var(--main-color);

  }
}

nav {
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
    color: var(--main-color);

}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  font-size: 1rem;
  border-left: 1px solid var(--color-border);
  color:  #000;
}

nav a:first-of-type {
  border: 0;
}
</style>
