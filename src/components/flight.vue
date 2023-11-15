<script setup>
import FlightPackage from "@/components/package.vue";
import FlightMode from "@/components/packageType.vue";
import { ref, watch } from "vue";
import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";

const emit = defineEmits(["updateSelected"]);
const props = defineProps(["flight", "passengers"]);
const store = useAppStore();
const { AddBookingInfo, toggleSummary } = store;
const { activePackage, booking } = storeToRefs(store);
const packageKey = ref(0);

// watch for change in selected package and update activaPackage selection flag
watch(
  () => activePackage.id,
  (newVal, oldValue) => {
    if (props.flight.id != newVal) {
      selected.value = "";
    }
  }
);

const selected = ref("");

const selectPackage = (offerOb) => {
  let flightData = {
    ...booking.value,
    id: props.flight.id,
    class_type: offerOb.name,
    data: offerOb,
  };

  selected.value = offerOb.name;

  AddBookingInfo(flightData);
  setTimeout(() => toggleSummary(true), 1);
  emit("updateSelected", flightData);
};

</script>

<template>
  <q-card bordered flat class="q-mb-sm">
    <div class="row q-pa-md items-between">
      <div class="col-5 row items-between no-wrap">
        <div class="col-4 from">
          <div class="text-h6 fix-title">
            {{ props.flight.from.alias }}
          </div>
          <div class="subtitle-text3">{{ props.flight.from.name }}</div>
        </div>
        <div class="col-4 timeline text-center">
          <q-icon name="flight" size="14px" class="change_angle" />
          <div class="special_text">15hrs 22min</div>
          <div class="special_text">{{ props.flight.stops }} stops(s)</div>
        </div>
        <div class="col-4 text-right to">
          <div class="text-h6 fix-title">
            {{ flight.to.alias }}
          </div>
          <div class="subtitle-text3">{{ props.flight.to.name }}</div>
        </div>
      </div>
      <!-- offers here -->
      <div class="col-7 row justify-end q-pl-md">
        <transition-group
          appear
          enter-active-class="animate__animated animate__bounce"
          leave-
          active-class="animate__animated animate__jello"
          mode="out-in"
        >
          <FlightPackage
            class="q-mr-sm"
            @chosen-package="selectPackage"
            :selected="selected"
            v-for="(offer, index) in props.flight.packages"
            :offer="offer"
            :key="index"
          />
        </transition-group>
      </div>
    </div>
    <q-card-section v-if="activePackage.id == props.flight.id">
      <div class="row items-center">
        <Transition
          appear
          enter-active-class="animate__animated animate__fadeLeft"
          active-class="animate__animated animate__fadeLeft"
          mode="out-in"
        >
          <FlightMode
            @update-key="updateKey"
            :key="packageKey"
            :class_type="activePackage.data.name"
            :price="activePackage.data.price"
            :seats="7"
          />
        </Transition>
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
