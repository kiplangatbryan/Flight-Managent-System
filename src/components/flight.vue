<script>
import flightPackage from "@/components/package.vue";

export default {
  components: {
    package: flightPackage,
  },
  props: ["flight"],
  setup() {
    return {};
  },
};
</script>

<template>
  <q-card bordered flat class="q-mb-sm">
    <div class="row q-pa-md items-between">
      <div class="col-5 row items-between no-wrap">
        <div class="col-4 from">
          <div class="text-h6 fix-title">1845 {{ flight.origin.alias }}</div>
          <div class="subtitle-text3">{{ flight.origin.name }}</div>
        </div>
        <div class="col-4 timeline text-center">
          <q-icon name="flight" size="14px" class="change_angle" />
          <div class="special_text">15hrs 22min</div>
          <div class="special_text">{{ flight.stops }} stops(s)</div>
        </div>
        <div class="col-4 text-right to">
          <div class="text-h6 fix-title">
            2345 {{ flight.destination.alias }}
          </div>
          <div class="subtitle-text3">{{ flight.destination.name }}</div>
        </div>
      </div>
      <!-- offers here -->
      <div class="col-7 row justify-end q-pl-md">
        <package
          class="q-mr-sm"
          v-for="(offer, index) in flight.packages"
          :offer="offer"
          :key="index"
        />
      </div>
    </div>
  </q-card>
</template>

<style lang="css" scoped>
.subtitle-text3 {
  font-size: 16px !important;
}
.special_text {
  font-size: 12px;
}
.change_angle {
  transform: rotate(90deg);
}

.timeline {
  line-height: 1.1;
}
.fix-title {
  font-size: 20px;
}

.max-width {
  width: 100%;
}
</style>