<script>
import flightPackage from "@/components/package.vue";
import FlightMode from "@/components/packageType.vue";
import { ref, onMounted } from "vue";
import moment from "moment";
import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";

export default {
  components: {
    package: flightPackage,
    FlightMode,
  },
  props: ["flight"],
  setup(props) {
    const store = useAppStore();
    const { changeActivePackage } = store;
    const { activePackage } = storeToRefs(store);

    const selectPackage = (offerOb) => {
      let data = {
        id: props.flight.id,
        data: offerOb,
      };
      changeActivePackage(data);
    };

    return {
      formatTime(time_data) {
        return moment(time_data).format("LLLL");
      },
      selectPackage,
      activePackage,
    };
  },
};
</script>

<template>
  <q-card bordered flat class="q-mb-sm">
    <div class="row q-pa-md items-between">
      <div class="col-5 row items-between no-wrap">
        <div class="col-4 from">
          <div class="text-h6 fix-title">
            {{ flight.from.alias }}
          </div>
          <div class="subtitle-text3">{{ flight.from.name }}</div>
        </div>
        <div class="col-4 timeline text-center">
          <q-icon name="flight" size="14px" class="change_angle" />
          <div class="special_text">15hrs 22min</div>
          <div class="special_text">{{ flight.stops }} stops(s)</div>
        </div>
        <div class="col-4 text-right to">
          <div class="text-h6 fix-title">
            {{ flight.to.alias }}
          </div>
          <div class="subtitle-text3">{{ flight.to.name }}</div>
        </div>
      </div>
      <!-- offers here -->
      <div class="col-7 row justify-end q-pl-md">
        <package
          class="q-mr-sm"
          @chosen-package="selectPackage"
          v-for="(offer, index) in flight.packages"
          :offer="offer"
          :key="index"
        />
      </div>
    </div>
    <q-card-section v-if="activePackage.id == flight.id">
      <div class="row items-center">
        <FlightMode
          :class_type="activePackage.data.name"
          :price="activePackage.data.price"
          :seats="7"
        />
      </div>
    </q-card-section>
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
.fix-font {
  font-size: 14px;
  margin-bottom: -15px;
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