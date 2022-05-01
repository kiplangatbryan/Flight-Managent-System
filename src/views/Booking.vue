<script>
import KQNavigation from "@/components/KQNavigation.vue";
import FooterKQ from "@/components/FooterKQ.vue";
import AvailableFlightsKQ from "@/components/displayFlights.vue";
import passengerInfo from "@/components/passengerInfo.vue";
import paymentOptions from "@/components/paymentOpt.vue";

import { ref } from "vue";

export default {
  components: {
    KQNavigation,
    FooterKQ,
    AvailableFlightsKQ,
    passengerInfo,
    paymentOptions,
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

<template>
  <div class="body">
    <header class="main_nav">
      <KQNavigation />
    </header>

    <!-- launch the search switcher here -->
    <div class="row content justify-between b-layout-fix">
      <div class="col-md-9 col-lg-9">
        <q-card class="bg-primary">
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
                  <div class="text-h5 q-mb-none">
                    Enter Passenger(s) Information
                  </div>
                </q-card-section>
                <q-card-section class="fix-font">
                  Please Enter the informaion for all the passengers on this
                  itenary and seelect continue. Please use English letters and
                  words.
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

            <q-step :name="3" title="Payment" icon="seat" class="adjust-step">
              <paymentOptions />
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
              <q-card flat bordered class="q-my-lg">
                <q-card-section>
                  Try out different ad text to see what brings in the most
                  customers, and learn how to enhance your ads using features
                  like ad extensions. If you run into any problems with your
                  ads, find out how to tell if they're running and how to
                  resolve approval issues.
                </q-card-section>
              </q-card>

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

      <div class="col-md-auto col-lg-auto">
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

<style lang="css" scoped>
.main_nav {
  background: #000;
  padding: 0 10em;
}

.content {
  padding: 2em 10em;
  min-height: 100vh;
}
.adjust-step {
  font-size: 20px !important;
}

.fix-font {
  font-size: 17px;
}

.b-layout-fix {
  gap: 8px !important;
}
</style>
