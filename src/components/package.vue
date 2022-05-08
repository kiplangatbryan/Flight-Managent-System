<template>
  <q-card bordered flat class="q-mr-sm q-pa-sm boxed">
    <q-item-section>
      <div class="offer_name">
        <span class="text-bold">{{ offer.name }} </span> <span>from</span>
      </div>
    </q-item-section>

    <q-item-section class="q-my-sm">
      <div class="row">
        <span class="offer_name q-mr-sm">KES</span>
        <span class="text-h6">{{ offer.price }}</span>
      </div>
    </q-item-section>

    <q-item-section>
      <q-btn v-if="selected" label="selected" color="red" />
    </q-item-section>

    <q-item-section>
      <div class="offer_name edit">Price for all passengers</div>
    </q-item-section>
  </q-card>
</template>

<script>
import { onMounted } from "vue";
export default {
  props: ["offer"],
  setup() {
    onMounted(() => {});
    return {};
  },
};
</script>

<style lang="css" scoped>
.boxed {
  max-width: 150px;
}
.offer_name {
  font-size: 13px;
}
.edit {
  margin-left: -8px;
}
</style>
