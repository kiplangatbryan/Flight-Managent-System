<template>
  <q-card
    bordered
    flat
    class="q-mr-sm q-pa-sm boxed"
    @click="$emit('chosenPackage', offer)"
    :class="[
      active ? selected : '',
      offer.name == 'Economy' ? 'bg-secondary' : 'bg-grey-1',
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
      <q-btn v-if="selected" label="selected" color="red" />
    </q-item-section>

    <q-item-section>
      <div class="offer_name edit">Price for all passengers</div>
    </q-item-section>
  </q-card>
</template>

<script>
import { onMounted, ref } from "vue";
import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";
export default {
  props: ["offer"],
  setup() {
    var selected = ref(false);
    const store = useAppStore();
    const { pageState, intermediate } = storeToRefs(store);

    onMounted(() => {
      // set main vars
      let class_s = intermediate.class_type;
      if (!pageState) {
        if (class_s == "all") {
          selected.value = false;
        } else {
          selected.value = intermediate.class_type;
        }
      }

      selected.value = false;
    });

    return {
      selected,
    };
  },
};
</script>

<style lang="css" scoped>
.boxed {
  max-width: 150px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
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
