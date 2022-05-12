<script>
import KQNavigation from "@/components/KQNavigation.vue";
import FooterKQ from "@/components/FooterKQ.vue";
import AvailableFlightsKQ from "@/components/displayFlights.vue";
import passengerInfo from "@/components/passengerInfo.vue";
import paymentOptions from "@/components/paymentOpt.vue";
import searchFlight from "@/components/searchFlight.vue";

import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";

import { ref, onMounted } from "vue";

export default {
  components: {
    KQNavigation,
    FooterKQ,
    AvailableFlightsKQ,
    passengerInfo,
    paymentOptions,
    searchFlight,
  },
  setup() {
    const step = ref(1);
    const backFunc = () => {
      step.value = step.value - 1;
    };

    const store = useAppStore();

    const { booking, searchShow, bookingStep, cardShow } = storeToRefs(store);

    return {
      step,
      editor: "",
      booking,
      backFunc,
      searchShow,
      cardShow,
      bookingStep,
      round_trip: ref(false),
    };
  },
};
</script>

<template>
  <div class="body">
    <header class="main_nav">
      <KQNavigation />
    </header>
    <Transition
      appear
      enter-active-class="animate__animated animate__bounce"
      leave-
      active-class="animate__animated animate__jello"
      mode="out-in"
    >
      <div class="row" v-if="searchShow">
        <searchFlight class="max-width" />
      </div>
    </Transition>

    <!-- alternative content goes here -->

    <div class="row content justify-between q-gutter-sm" v-if="searchShow">
      <div class="text-h4">Some of the Offers available</div>
    </div>
    <!-- launch the search switcher here -->
    <div class="row content justify-between q-gutter-sm">
      <div class="col-md-8 col-lg-8" v-if="bookingStep">
        <q-card class="bg-primary">
          <q-stepper
            class="shadow-0"
            v-model="step"
            horizontal
            header-nav
            keep-alive
            color="primary"
            flat
            active-color="primary"
            swipeable
            done-color="yellow"
          >
            <q-step
              :name="1"
              title="Flights"
              class="adjust-step"
              subtitle="Choose the type and time of flight"
              icon="flight"
              :done="step > 1"
            >
              <AvailableFlightsKQ />

              <q-stepper-navigation>
                <q-btn @click="step = 2" color="primary" label="Continue" />
              </q-stepper-navigation>
            </q-step>

            <q-step
              :name="2"
              title="Passengers"
              icon="people"
              subtitle="Enter your information"
            >
              <q-card flat bordered class="q-my-lg">
                <q-card-section>
                  <div class="text-h6 q-mb-none">
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

            <q-step
              :name="3"
              title="Payment"
              icon="seat"
              class="adjust-step"
              subtitle="Make payment for your flight"
            >
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
                <q-card-section class="fix-font">
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

      <div class="col-md-3 col-lg-3" v-if="cardShow">
        <q-card class="custom-box shadow-2" bordered>
          <div class="content-apk">
            <q-card-section>
              <div class="text-h6 row">
                <div class="q-ml-md text-h6">Summary</div>
              </div>
            </q-card-section>
            <div class="row">
              <div class="col-11 bg-grey-4 switch-block">
                <q-toggle v-model="round_trip" icon="round" />
              </div>
            </div>
            <q-card-section>
              <div class="row items-start">
                <div class="counter bg-grey-3 q-mr-sm"></div>

                <div class="line-pack">
                  <span class="text-bold sum-title">Seatle</span><br />
                  <span class="subtitle-text2">United States</span>
                </div>
              </div>
              <div class="row items-start">
                <div class="counter bg-grey-3 q-mr-sm"></div>
                <div>
                  <span class="text-bold sum-title">Nairobi</span><br />
                  <span class="subtitle-text2">Kenya</span>
                </div>
              </div>
            </q-card-section>

            <q-card-section
              class="q-pt-none"
              v-if="booking.flightInfo.class_type"
            >
              <div class="row">
                <div class="row items-start">
                  <div class="q-mr-md">
                    <q-icon name="link" color="grey" size="1.2em" />
                  </div>
                  <div>
                    <span class="text-bold sum-title">{{
                      booking.flightInfo.class_type
                    }}</span
                    ><br />
                    <span class="subtitle-text2">class</span>
                  </div>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none" v-if="booking.person">
              <div class="row justify-between">
                <div class="row items-start">
                  <div class="q-mr-md">
                    <q-icon name="person" color="grey" size="1.2em" />
                  </div>
                  <div>
                    <span class="text-bold sum-title"
                      >{{ booking.person }} Person(s)</span
                    ><br />
                    <span class="subtitle-text2">Passenger</span>
                  </div>
                </div>

                <div class="row bg-grey-4 rounded items-center">
                  <q-btn
                    label="-"
                    class="btn-custom q-mr-sm bg-white"
                    flat
                    rounded
                  />
                  <q-btn label="+" class="btn-custom bg-white" flat rounded />
                </div>
              </div>
            </q-card-section>
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
.btn-custom {
  font-size: 14px;
}
.fix-font {
  font-size: 15px;
}

.switch-block {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.sum-title {
  font-size: 17px;
}

.custom-box {
  width: 100%;
  border-radius: 10px;
}

.b-layout-fix {
  gap: 8px !important;
}

.max-width {
  max-width: unset;
}

.rounded {
  border-radius: 20px;
}

.counter {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  margin-top: 7px;
  margin-left: -3px;
  margin-right: 18px;
}

.line-pack {
  position: relative;
}

.line-pack::before {
  content: "";
  position: absolute;
  background: grey;
  left: -26px;
  width: 2px;
  top: 25px;
  bottom: calc(50% + 25px);
  height: calc(50% - 3px);
}
</style>
