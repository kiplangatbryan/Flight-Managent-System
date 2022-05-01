<script>
import mpesaPayment from "@/components/pesa.vue";
import { useAppStore } from "@/stores/main";
import { onMounted } from "vue";

export default {
  name: "payEngine",
  components: { mpesaPayment },

  setup() {
    const store = useAppStore();

    onMounted(() => {});

    return {
      store,
    };
  },
};
</script>

<template>
  <div class="ladder">
    <mpesaPayment />
  </div>
</template>



<style lang="css" scoped>
</style>