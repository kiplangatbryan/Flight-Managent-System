<script>
import ThemeCard from "@/components/dateCard.vue";
import Flight from "@/components/flight.vue";

import { onMounted, ref } from "vue";
import moment from "moment";
import { useAppStore } from "@/stores/main";

export default {
  name: "FlightSelect",
  components: {
    ThemeCard,
    Flight,
  },
  setup() {
    const dateCards = ref([]);
    const store = useAppStore();

    const { flights } = store;
    const nextBtn = {
      price: "7 days",
      currency: "7 days",
      active: false,
      btn: true,
      date: "+7",
    };
    onMounted(() => generateDatesAroundTD(Date.now()));
    const generateDatesAroundTD = function (chosenDate) {
      var momObject = moment(chosenDate).subtract(3, "days");
      for (let i = 0; i < 7; i++) {
        let stateActive = false;

        let datePrefix = moment(momObject)
          .add(i, "days")
          .format("LLLL")
          .split(",");
        // selected date
        if (i == 3) stateActive = true;

        dateCards.value.push({
          currency: "KES",
          active: stateActive,
          btn: false,
          date: `${datePrefix[0].slice(0, 3)} ${datePrefix[1].split(" ")[2]}`,
          price: "462,910",
        });
      }
    };

    return {
      dateCards,
      nextBtn,
      today: moment().format("LLLL"),
      flights,
    };
  },
};
</script>

<template>
  <q-card bordered flat>
    <q-card-section>
      <div class="text-h5">Select Departure Flight</div>
      <div class="text-bold fix-font">
        SEATTLE (SA) - NAIROBI (KE) [One way]
      </div>
    </q-card-section>
    <q-card-section> {{ today }} </q-card-section>
    <q-card-section>
      <!-- date selection -->
      <div class="row no-wrap">
        <ThemeCard
          v-for="(tag, index) in dateCards"
          :key="index"
          :currency="tag.currency"
          :active="tag.active"
          :price="tag.price"
          :btn="tag.btn"
          :date="tag.date"
        />
        <ThemeCard
          :currency="nextBtn.currency"
          :active="nextBtn.active"
          :price="nextBtn.price"
          :btn="nextBtn.btn"
          :date="nextBtn.date"
        />
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h5 q-mb-md">Select Your Prefered flight</div>
      <Flight
        v-for="(flight, index) in flights"
        :flight="flight"
        :key="index"
      />
    </q-card-section>
  </q-card>
</template>

<style lang="css" scoped>
.fix-font {
  font-size: 13px;
}
</style>
