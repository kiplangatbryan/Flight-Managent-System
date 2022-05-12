<template>
  <div>
    <div class="main-nav">
      <KQNavigation />
    </div>
  </div>
</template>

<script>
import KQNavigation from "@/components/KQNavigation.vue";

export default {
  components: {
    KQNavigation,
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.main_nav {
  background: #000;
  padding: 0 10em;
}
</style>