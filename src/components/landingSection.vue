<script setup>
import anime from "animejs";
import { onMounted, ref } from "vue";

import TabFlight from "@/components/TabFlight.vue";


const headline = ref(null);

onMounted(() => {
  // Wrap every letter in a span
  let textWrapper = headline.value.firstChild;
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: true })
    .add({
      targets: ".headline_wrapper .letter",
      translateY: ["1.1em", 0],
      translateZ: 0,
      duration: 750,
      delay: (el, i) => 50 * i,
    })
    .add({
      targets: headline.value.parentElement,
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000,
    });
});
</script>


<template>
  <div class="container landing_section">
    <div class="">
      <div class="landing_mod">
        <h3 class="headline_wrapper text-white" ref="headline">
          <div class="headline_text">The World is your oyster</div>
        </h3>
      </div>
      <h6 class="text-white text-body1">Book cheap flights and save money.</h6>
    </div>

    <div class="flight_select">
      <TabFlight />
    </div>
  </div>
</template>


<style>


.headline_wrapper {
  position: relative;
  display: inline-block;
  padding-top: 0.2em;
  padding-right: 0.05em;
  padding-bottom: 0.1em;
  overflow: hidden;
}

.headline_wrapper .letter {
  display: inline-block;
  line-height: 1em;
}
@media (max-width: 999px) {
  .headline_wrapper {
    margin: 2rem 0 !important;
  }
}


.landing_section {
  padding-top: 100px !important;
  padding-bottom:5rem !important;
  width: 100%;
  background: linear-gradient(-45deg, transparent, #141414),
    url("@/assets/png-1.jpg") center;
  background-size: cover;
  background-attachment: fixed;
}

@media (max-width: 600px) {
 
  .landing_mod
  {
    padding: 0 2rem !important;
  }

  .headline_wrapper {
    line-height: 1.2;
  }
  .landing_mod h3 {
    font-size: 36px;
  }
}

.flight_select {
  margin-top: 2rem;
}

</style>