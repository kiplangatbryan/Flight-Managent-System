<script>
import ThemeCard from "@/components/dateCard.vue";
import FlightPackages from "@/components/packages.vue";

import { onMounted, ref } from "vue";
import moment from "moment";
export default {
  name: "FlightSelect",
  components: {
    ThemeCard,
    FlightPackages,
  },
  setup() {
    const dateCards = ref([]);
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
        let datePrefix = moment(momObject)
          .add(i, "days")
          .format("LLLL")
          .split(",");
        dateCards.value.push({
          currency: "KES",
          active: false,
          btn: false,
          date: `${datePrefix[0].slice(0, 3)} ${datePrefix[1].split(" ")[2]}`,
          price: "462,910",
        });
      }
    };


    return {
      dateCards,
      nextBtn,
      today: moment().format('LLLL')
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
    <q-card-section> {{today }} </q-card-section>
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
      <FlightPackages />
    </q-card-section>
  </q-card>
</template>

<style lang="css" scoped>
.fix-font {
  font-size: 13px;
}
</style>
