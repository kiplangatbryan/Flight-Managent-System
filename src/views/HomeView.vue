<script>
import KQNavigation from "@/components/KQNavigation.vue";
import FlightSelectCard from "@/components/flightSelectCard.vue";
import TabFlight from "@/components/TabFlight.vue";
import TabCheckIn from "@/components/TabCheckIn.vue";
import KQSearch from "@/components/KQSearch.vue";
import FooterKQ from "@/components/FooterKQ.vue";
import KQCard from "@/components/KQCard.vue";

import { onMounted, ref } from "vue";

export default {
  components: {
    KQNavigation,
    FlightSelectCard,
    TabFlight,
    TabCheckIn,
    KQSearch,
    FooterKQ,
    KQCard,
  },

  setup() {
    onMounted(() => {
      console.log("mounted");
    });
    const subscribe = ref(null);

    return {
      lorem: `Need Any Help",
          title: "Cancle a Trip",
          msg: "You want to clear your booking, don't worry, we've got you", btnText: "Change Timeline",
          title: "Swap FLight",
          msg: "You want to clear your booking, don't worry, we've got you"`,
      help_array: [
        {
          btnText: "Need Any Help",
          title: "Cancle a Trip",
          msg: "You want to clear your booking, don't worry, we've got you",
        },
        {
          btnText: "Check In",
          title: "Where to Check In",
          msg: "You want to clear your booking, don't worry, we've got you",
        },
        {
          btnText: "Change Timeline",
          title: "Swap FLight",
          msg: "You want to clear your booking, don't worry, we've got you",
        },
      ],
      modalShow: false,
      subscribe,
    };
  },
};
</script>

<template>
  <main class="home__page">
    <div class="landing_section">
      <KQNavigation />

      <h3 class="landing_text q-mt-lg text-white">
        Hey Buddy! where are you<br />
        <b>Flying</b> to?
      </h3>

      <q-btn
        to="/make-a-booking"
        color="primary"
        style="font-size: 20px"
        no-caps
        label="Book Now &#10230;"
      />
    </div>
    <div class="container">
      <div class="flight_select">
        <FlightSelectCard>
          <template v-slot:TabFlight>
            <TabFlight />
          </template>
          <template v-slot:CheckIn>
            <TabCheckIn />
          </template>
          <template v-slot:FlightStatus>
            <TabCheckIn />
          </template>
        </FlightSelectCard>
      </div>
      <KQSearch />

      <!-- page-section -->

      <div class="section q-mt-lg">
        <div class="text-h4 q-mb-md">Top Destinations</div>
        <div class="subtitle section-space">
          Get to <span>Explore</span> and <span>Find</span> a variety of Places,
          we will take you there.
        </div>

        <div class="row q-gutter-sm">
          <div class="col-5">
            <KQCard :flightId="101" />
          </div>
          <div class="col-6">
            <div class="row q-gutter-sm">
              <div class="col-6">
                <KQCard :flightId="101" />
              </div>
              <div class="col-6">
                <KQCard :flightId="101" />
              </div>
              <div class="col-6">
                <KQCard :flightId="101" />
              </div>
              <div class="col-6">
                <KQCard :flightId="101" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- page-section -->

      <div class="section q-mt-lg">
        <div class="help_card text-white">
          <div class="content">
            <div class="text-h4 q-mb-md">Never Miss An Offer</div>
            <div class="subtitle q-mb-md">
              Subscribe and be the first to receive
              <span>exclusive</span> content from KQ

              <q-input
                v-model="subscribe"
                type="email"
                label="Subscribe"
                bg-color="white"
                lazy-rules
                class="max-width"
                filled
                outlined
                placeholder="Your Email Address"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Enter a valid Email address',
                ]"
              />
            </div>
            <q-btn
              label="Subscribe"
              no-caps
              style="font-size: 20px"
              outline
              color="dark"
              class="text-white"
            />
          </div>
        </div>
      </div>
    </div>
    <FooterKQ />
  </main>
</template>

<style>
.home__page {
}

.container {
  padding: 0 10rem;
}

.landing_text {
  text-align: left;
  line-height: 1.5;
  margin-top: 5rem !important;
}
.max-width {
  max-width: 500px;
  margin: 0.5em 0;
}
.help_card {
  background: linear-gradient(60deg, transparent, #141414),
    linear-gradient(60deg, transparent, #141414),
    linear-gradient(60deg, transparent, #141414), url("@/assets/png-1.jpg") left;
  background-size: cover;
  background-attachment: fixed;
  position: realtive;
  height: 50vh;
  border-radius: 5px;
  margin-bottom: 10em;
}

.help_card .content {
  position: absolute;
  right: 0;
  width: 60%;
  padding: 4em 0;
}

a {
  display: inline-block;
  padding: 0 1rem;
  font-size: 1rem;
  border-left: 1px solid var(--color-border);
  color: #eee;
  text-decoration: none;
  margin-top: 1rem;
  font-size: 20px;
  color: rgb(243, 243, 243);
}

.landing_section {
  width: 100%;
  min-height: 70vh;
  background: linear-gradient(-45deg, transparent, #141414),
    url("@/assets/png-1.jpg") center;
  background-size: cover;
  background-attachment: fixed;
  padding: 0 10rem;
}

.flight_select {
  position: relative;
  top: -80px;
  display: flex;
  justify-content: center;
}
.section-space {
  margin-bottom: 4rem;
}
.section-help {
  position: relative;
  background-attachment: fixed;
}

.kg_overlay {
  position: absolute;
  top: -5%;
  right: 5%;
  font-size: 300px;
  letter-spacing: 3px;
  z-index: -1;
  opacity: 0.1;
  display: flex;
  flex-wrap: nowrap;
}

.subtitle {
  font-size: 18px;
}

.subtitle span {
  font-weight: bold;
  border-bottom: 3px solid #000;
}
</style>
