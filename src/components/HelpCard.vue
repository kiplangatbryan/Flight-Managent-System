<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  btnText: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="help-card" >
    <div class="row q-mt-lg">
      <div class="section-card">
        <div class="text-h5">{{ title }}</div>
        <p class="q-mt-md">
          {{ msg }}
        </p>
        <q-btn no-caps  color="secondary" to="/cancel-trip">{{
          btnText
        }}</q-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
