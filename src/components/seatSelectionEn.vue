<script>
import seatDraw from "@/components/seatDraw.vue";
import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";

export default {
  name: "seatEngine",
  component: { seatDraw },

  setup() {
    const store = useAppStore();

    const { seats } = storeToRefs(store);

    const sectionA = ref([]);
    const sectionB = ref([]);
    const sectionC = ref([]);

    onMounted(() => {
      const half = seats.value.length / 3;
      for (let i = 0; i < seats.value.length; i++) {
        if (i < half) {
          sectionA.value.push(seats.value[i]);
          continue;
        }

        if (i < half * 2) {
          sectionB.value.push(seats.value[i]);
          continue;
        }

        if (i < half * 3) {
          sectionC.value.push(seats.value[i]);
          continue;
        }
      }
      console.log(sectionA.value);
      console.log(sectionB.value);
      console.log(seats.value);
    });

    return {
      seats,
      sectionA,
      sectionB,
      sectionC,
    };
  },
};
</script>

<template>
  <div class="ladder">
    <div class="row q-gutter-md justify-between">
      <div class="col-3">
        <seatDraw
          v-for="(index, seat) in sectionA"
          :key="index"
          :seatId="seat.seactId"
          :occupied="seat.occupied"
        />
      </div>
      <div class="col-3">
        <seatDraw
          v-for="(index, seat) in sectionB"
          :key="index"
          :seatId="seat.seactId"
          :occupied="seat.occupied"
        />
      </div>
      <div class="col-3">
        <seatDraw
          v-for="(index, seat) in sectionC"
          :key="index"
          :seatId="seat.seactId"
          :occupied="seat.occupied"
        />
      </div>
    </div>
  </div>
</template>



<style lang="css" scoped>
</style>