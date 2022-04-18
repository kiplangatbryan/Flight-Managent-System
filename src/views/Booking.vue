<template>
  <div class="body">
    <header class="main_nav">
      <KQNavigation />
    </header>

    <!-- launch the search switcher here -->

    <div class="row q-gutter-md content">
      <div class="col-md-7 col-lg-7">
        <q-card bordered flat>
          <q-stepper
            class="shadow-0"
            v-model="step"
            horizontal
            color="primary"
            animated
            swipeable
            done-color="yellow"
          >
            <q-step
              :name="1"
              title="Choose Flight"
              class="adjust-step"
              icon="flight"
              :done="step > 1"
            >
              <AvailableFlightsKQ />

              <q-stepper-navigation>
                <q-btn @click="step = 2" color="primary" label="Continue" />
              </q-stepper-navigation>
            </q-step>

            <q-step :name="2" title="Passengers" icon="people">
              <q-card flat bordered class="q-my-lg">
                <q-card-section>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
                  placeat hic incidunt modi quos praesentium, corrupti
                  obcaecati! Soluta aliquam ullam, impedit quia numquam expedita
                  suscipit ab aperiam vero modi accusantium.
                </q-card-section>
              </q-card>
              <passengerInfo />

              <q-stepper-navigation>
                <q-btn @click="step = 3" color="primary" label="Continue" />
                <q-btn
                  flat
                  @click="backFunc"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="3"
              title="Seat Selection"
              icon="seat"
              class="adjust-step"
            >
              <q-card flat bordered class="q-my-lg">
                <q-card-section>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea
                  placeat hic incidunt modi quos praesentium, corrupti
                  obcaecati! Soluta aliquam ullam, impedit quia numquam expedita
                  suscipit ab aperiam vero modi accusantium.
                </q-card-section>
              </q-card>
              <seatSelectionEn />
              <q-stepper-navigation>
                <q-btn @click="step = 3" color="primary" label="Continue" />
                <q-btn
                  flat
                  @click="backFunc"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="4"
              title="Finish"
              class="adjust-step"
              icon="thumbs"
              disable
            >
              Try out different ad text to see what brings in the most
              customers, and learn how to enhance your ads using features like
              ad extensions. If you run into any problems with your ads, find
              out how to tell if they're running and how to resolve approval
              issues.

              <q-stepper-navigation>
                <q-btn color="primary" label="Finish" />
                <q-btn
                  flat
                  @click="backFunc"
                  color="primary"
                  label="Back"
                  class="q-ml-sm"
                />
              </q-stepper-navigation>
            </q-step>
          </q-stepper>
        </q-card>
      </div>

      <div class="col-md-4 col-lg-4">
        <q-card flat bordered>
          <div class="content-apk">
            <q-card-section>
              <div class="text-h6 row">
                <div class="q-ml-md text-h5">OutBound</div>
              </div>
              <div class="q-my-md row items-start">
                <div class="q-mr-sm">
                  <q-spinner-orbit color="primary" size="1.3em" />
                  <q-tooltip :offset="[0, 8]">QSpinnerPie</q-tooltip>
                </div>
                <div>
                  <div class="text-bold">SEATTLE (SA) - NAIROBI (KE)</div>
                  <div class="subtitle-text2">14hrs long Trip</div>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none"> </q-card-section>
          </div>
        </q-card>
      </div>
    </div>

    <FooterKQ />
  </div>
</template>

<script>
import KQNavigation from "@/components/KQNavigation.vue";
import FooterKQ from "@/components/FooterKQ.vue";
import AvailableFlightsKQ from "@/components/displayFlights.vue";
import passengerInfo from "@/components/passengerInfo.vue";
import seatSelectionEn from "@/components/seatSelectionEn.vue";

import { ref } from "vue";

export default {
  components: {
    KQNavigation,
    FooterKQ,
    AvailableFlightsKQ,
    passengerInfo,
    seatSelectionEn,
  },
  setup() {
    const step = ref(1);
    const backFunc = () => {
      step.value = step.value - 1;
    };

    return {
      step,
      editor: "",
      backFunc,
    };
  },
};
</script>

<style lang="css" scoped>
.main_nav {
  background: #000;
  background-size: cover;
  padding: 0 10em;
}

.content {
  padding: 2em 10em;
  min-height: 100vh;
}
.adjust-step {
  font-size: 20px !important;
}
.body {
  /* background: rgb(95, 237, 138); */
}
</style>
