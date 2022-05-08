<template>
  <div class="q-gutter-y-md card__main">
    <q-card>
      <q-tabs
        v-model="tab"
        active-bg-color="white"
        no-caps
        switch-indicator
        inline-label
        class="bg-dark text-white"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        style="max-width: 700px"
      >
        <q-tab icon="flight" name="flights" color="secondary" label="Flights" />
        <q-tab name="check_in" icon="door" label="Check In" />
        <q-tab name="flight_status" icon="" label="Flight Status" />
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        keep-alive
        vertical
        transition-prev="fade"
        transition-next="fade"
      >
        <q-tab-panel name="flights">
          <slot name="TabFlight" />
        </q-tab-panel>

        <q-tab-panel name="check_in">
          <slot name="CheckIn" />
        </q-tab-panel>

        <q-tab-panel name="flight_status">
          <slot name="FlightStatus" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  components: {},
  setup() {
    return {
      tab: ref("flights"),
    };
  },
};
</script>

<style scoped>
.card__main {
  width: 100%;
}
</style>
