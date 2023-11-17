<script setup>
import KQNavigation from "@/components/KQNavigation.vue";
import FlightSelectCard from "@/components/flightSelectCard.vue";
import TabCheckIn from "@/components/TabCheckIn.vue";
import FooterKQ from "@/components/FooterKQ.vue";
import KQCard from "@/components/KQCard.vue";
import landingSection from "@/components/landingSection.vue";


import { onMounted, ref } from "vue";

import { useAppStore } from "@/stores/main";

const subscribe = ref(null);
const store = useAppStore();


const { flights } = store;


</script>

<template>
  <main class="home__page">
    <KQNavigation />
    <landingSection />
    <div class="container">

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

section {
    padding: 5rem 0;
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


@media (max-width: 600px) {
  .help_card .content {
    padding: 4rem 2rem;
  }
  .k-space {
    padding: 0 2rem !important;
  }

  .help_card {
    border-radius: 0;
  }
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
