<script setup>
import KQNavigation from "@/components/KQNavigation.vue";
import FlightSelectCard from "@/components/flightSelectCard.vue";
import TabFlight from "@/components/TabFlight.vue";
import TabCheckIn from "@/components/TabCheckIn.vue";
import FooterKQ from "@/components/FooterKQ.vue";
import KQCard from "@/components/KQCard.vue";

import { onMounted, ref } from "vue";

import { useAppStore } from "@/stores/main";

const subscribe = ref(null);
const store = useAppStore();

const modalShow = ref(false);

const { flights } = store;
</script>

<template>
  <main class="home__page">
    <div class="container landing_section">
      <KQNavigation />

      <div class="landing_mod">
        <h3 class="landing_text q-mt-lg text-white">
          Hey Buddy! where are you<br />
          <b>Flying</b> to?
        </h3>
  
        <q-btn
          to="/make-a-booking"
          color="primary"
          style="font-size: 18px"
          no-caps
          label="Book Now &#10230;"
        />

      </div>

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

      <!-- page-section -->

      <section class="section q-mt-md q-mb-lg">
        <div class="k-space">
          <div class="text-h4 q-mb-md">Top Destinations</div>
        <div class="subtitle section-space">
          Get to <span>Explore</span> and <span>Find</span> a variety of Places,
          we will take you there.
        </div>
      </div>

        <div class="row q-gutter-md">
          <div class="col-3" v-for="(route, index) in flights" :key="index">
            <KQCard
              :class_bs="route.packages[0].name"
              :index="index"
              :city="route.origin.name"
              :price="route.packages[0].price"
            />
          </div>
        </div>
      </section>

      <!-- page-section -->

      <section class="section q-mt-lg">
        <div class="help_card text-white">
          <div class="content">
            <div class="text-h4 q-mb-md">Never Miss An Offer</div>
            <div class="subtitle q-mb-md">
              <div>
                Subscribe and be the first to receive
                <span>exclusive</span> content from <span>Dooley Airways</span>
              </div>

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
      </section>
    </div>
    <FooterKQ />
  </main>
</template>

<style>
.home__page {
}
.landing_text {
  text-align: left;
  line-height: 1.5;
  margin: 3rem 0 !important;
}

@media (max-width: 999px) {
  .landing_text {
    margin: 2rem 0 !important;
  }
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
  min-height: 350px;
  border-radius: 5px;
  margin-bottom: 10em;
}

.help_card .content {
  position: absolute;
  right: 0;
  width: 60%;
  padding: 4em 0;
}

@media (max-width: 980px) {
  .help_card .content {
    width: 100%;
    position: unset;
    padding: 4rem;
  }
}


a {
  display: inline-block;
  padding: 0 1rem;
  font-size: 1rem;
  border-right: 1px solid var(--color-border);
  color: #eee;
  text-decoration: none;
  margin-top: 1rem;
  font-size: 20px;
  color: rgb(243, 243, 243);
}

.landing_section {
  width: 100%;
  min-height: 540px;
  background: linear-gradient(-45deg, transparent, #141414),
    url("@/assets/png-1.jpg") center;
  background-size: cover;
  background-attachment: fixed;
}

@media (max-width: 600px) {
  .landing_section {
    min-height: 470px;
  }
}
@media (max-width: 600px) {

  .help_card .content {
    padding: 4rem 2rem;
  }
  .landing_mod, .k-space  {
    padding: 0 2rem !important;
  }

  .landing_text {
    line-height: 1.2;
  }
  .landing_mod h3 {

    font-size: 36px;
  }
  .help_card {
    border-radius: 0;
  }
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
