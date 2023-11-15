<template>
  <q-card
    bordered
    flat
    class="q-mr-sm q-pa-sm boxed"
    @click="$emit('chosenPackage', offer)"
    :class="[
      offer.name == 'Economy' ? 'bg-yellow' : 'bg-grey-1',
      selected == offer.name ? 'selected' : '',
    ]"
  >
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
      <q-btn v-if="offer.selected" label="selected" color="red" />
    </q-item-section>

    <q-item-section>
      <div class="offer_name edit">Price for all passengers</div>
    </q-item-section>
  </q-card>
</template>

<script setup>
defineProps(["offer", "selected"]);
</script>

<style lang="css" scoped>
.boxed {
  max-width: 150px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.selected {
  outline: 3px solid blue;
}
.boxed:hover {
  transform: scale(1.05);
}
.offer_name {
  font-size: 13px;
}
.edit {
  margin-left: -8px;
}

.active {
  border-color: aqua;
}
</style>
