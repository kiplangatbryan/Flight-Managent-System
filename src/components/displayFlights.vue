<script setup>
import Flight from "@/components/flight.vue";

import { onMounted, ref, watch } from "vue";
import moment from "moment";
import { useAppStore } from "@/stores/main";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const store = useAppStore();
var flights = ref([]);
const router = useRouter();
const today = new Date(Date.now());

const { searchToggle, searchFlight, changeActivePackage} = store;
const { pageState, intermediate } = storeToRefs(store);

// create a fligts list

const populateUsingId = () => {
  // differerent kind of work
  if (intermediate.value.data.length == 0) {
    return false;
  }

  const updatedFlights = intermediate.value.data.map((val) => {
    return { ...val, to: intermediate.value.to, from: intermediate.value.from };
  });
  flights.value = updatedFlights;
  return true;
};

// watch((newValue, oldValue) => {
//   populateUsingId();
// });

const changeActive = (data) => {
  // create a custom component partition.
  changeActivePackage(data)
}

onMounted(async () => {
  if (
    router.currentRoute.value.query.to &&
    intermediate.value.data.length > 0
  ) {
    await searchFlight({
      to: { label: router.currentRoute.value.query.to },
      from: { label: router.currentRoute.value.query.from },
      departure: today,
      class_type: "Any",
    });
  }
  if (populateUsingId()) searchToggle(false);
});
</script>

<template>
  <div class="main-bg">
    <q-card borderless flat>
      <q-card-section v-if="pageState"> </q-card-section>
      <q-card-section>
        <div class="text-h6 q-mb-md" v-if="!pageState">
          Select Your Preferred flight
        </div>
        <div class="text-h6 q-mb-md" v-else>
          Choose a flight from the list below
        </div>
        <Flight
          v-for="(flight, index) in flights"
          :flight="flight"
          
          @updateSelected="changeActive"
          :key="index"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<style lang="css" scoped>
.fix-font {
  font-size: 13px;
}
</style>
