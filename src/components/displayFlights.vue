<script>
import Flight from "@/components/flight.vue";

import { onMounted, ref } from "vue";
import moment from "moment";
import { useAppStore } from "@/stores/main";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";

export default {
  name: "FlightSelect",
  components: {
    Flight,
  },
  watch: {
    fetched(newValue, oldValue) {
      this.populateUsingId();
    },
  },
  setup() {
    const store = useAppStore();
    var flights = ref([]);
    var flights_to_from = ref({});

    const { searchToggle } = store;
    const { pageState, fetched, intermediate } = storeToRefs(store);

    // create a fligts list

    const populateUsingId = () => {
      // differerent kind of work
      if (intermediate.value.data.length == 0) {
        return false;
      }
      flights.value = intermediate.value["data"];
      flights_to_from.value["to"] = flights.value[0].to.name;
      flights_to_from.value["from"] = flights.value[0].from.name;
      return true;
    };

    onMounted(() => {
      if (populateUsingId()) searchToggle(false);
      console.log("hurray mounted");
      console.log("fetched" + fetched);
    });

    return {
      populateUsingId,
      fetched,
      today: moment().format("LLLL"),
      flights,
      pageState,
      flights_to_from,
    };
  },
};
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
