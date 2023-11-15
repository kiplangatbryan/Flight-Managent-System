<template>
  <footer class="container q-mb-lg">
    <q-separator class="q-mb-lg" />


    <div class="row justify-between items-center k-segment k-space">
      <div class="copy">
        &copy; {{ new Date().getFullYear() }} | Dooley Airways
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
footer {
  position: relative;
}
.copy {
  color: unset;
  font-size: 16px;
}
.copy {
  margin-top: 8px;
}

.k-segment {
  flex-flow: column;
  align-items: start;
}

</style>
