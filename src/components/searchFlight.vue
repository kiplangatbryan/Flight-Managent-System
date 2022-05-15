<template>
  <div class="container q-py-lg">
    <div class="max-width">
      <div class="text-h4 q-mb-md">Where do you want to Fly?</div>
    </div>
    <div class="row q-gutter-sm max-width justify-start">
      <div class="col-2">
        <q-select
          v-model="flight_params.trip_type"
          :options="TripOptions"
          label="class"
          flat
          class="bg-white"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
      <div class="col-2">
        <q-input
          v-model="flight_params.passengers"
          type="number"
          label="passengers"
          class="bg-white"
          :rules="[
            (val) => (typeof val && val.length > 0) || 'Enter a departure date',
            (val) => val <= 60 || 'Passengers cannot exceed',
          ]"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-input>
      </div>
      <div class="col-2">
        <q-select
          v-model="flight_params.class_type"
          :options="classOptions"
          label="class"
          flat
          class="bg-white"
        >
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="row q-gutter-sm max-width justify-between">
      <div class="col-6 row">
        <div class="col-6">
          <q-select
            v-model="flight_params.from"
            :options="FromOptions"
            label="From"
            outlined
            standout
            class="bg-white out-cast"
            use-input
            @filter="filterFromFn"
            input-debounce="0"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div class="col-6">
          <q-select
            v-model="flight_params.to"
            :options="ToOptions"
            label="Where are you headed?"
            outlined
            flat
            class="bg-white out-cast"
            use-input
            @filter="filterToFn"
            input-debounce="0"
          >
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>{{ scope.opt.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
      </div>

      <div class="col-3 row">
        <div class="col-6">
          <q-input
            v-model="flight_params.departure"
            type="date"
            label="Departure"
            bg-color="white"
            lazy-rules
            stack-label
            outlined
            :rules="[
              (val) => (val && val.length > 0) || 'Enter a departure date',
            ]"
          >
          </q-input>
        </div>

        <div class="col-6" v-if="showArrival">
          <q-input
            v-model="flight_params.arrival"
            type="date"
            label="Arrival"
            bg-color="white"
            lazy-rules
            stack-label
            outlined
            :rules="[
              (val) => (val && val.length > 0) || 'Enter a arrival date',
            ]"
          >
          </q-input>
        </div>
      </div>

      <div class="col-2">
        <q-btn
          label="Search Flight"
          icon-right="flight_takeoff"
          @click="searchForFlight"
          color="primary"
          class="search-btn"
          no-caps
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useQuasar, QSpinnerCube } from "quasar";

export default {
  name: "create-task-modal",
  watch: {
    "flight_params.trip_type"(val, old) {
      if (val.value == "return") {
        this.showArrival = false;
      } else {
        this.showArrival = true;
      }
    },
  },

  setup() {
    var FromOptions = ref([]);
    var ToOptions = ref([]);
    const showArrival = ref(true);
    var allDestinations = null;
    const TripOptions = [
      {
        label: "Round",
        value: "return",
      },
      {
        label: "One Way",
        value: "direct",
      },
    ];

    const classOptions = [
      {
        label: "Any",
        value: "all",
      },
      {
        label: "Economy",
        value: "Economy",
      },
      {
        label: "Business",
        value: "Business",
      },
      {
        label: "First Class",
        value: "First_class",
      },
    ];
    var flight_params = ref({
      arrival: null,
      departure: null,
      from: null,
      to: null,
      passengers: 1,
      trip_type: TripOptions[0],
      class_type: classOptions[0],
    });

    const store = useAppStore();
    const qua = useQuasar();

    const { searchFlight, updateFetch, searchToggle, toggleStep } = store;

    const { destinations } = storeToRefs(store);

    const searchForFlight = async () => {
      qua.loading.show({
        message: "We are searching for your flight",
        messageColor: "white",
        backgroundColor: "red",
        spinnerColor: "primary",
        spinner: QSpinnerCube,
      });
      const q = await searchFlight(flight_params.value);
      if (!q) {
        // show alert box
        qua.loading.hide();

        return;
      }

      setTimeout(() => {
        updateFetch();
        searchToggle(false);
      }, 1);
      toggleStep(true);

      qua.loading.hide();
    };

    const createOptionsFromFLights = () => {
      // all flights
      allDestinations = destinations.value.map((destination) => {
        return {
          value: destination.name + "_" + destination.alias,
          label: destination.name,
        };
      });

      FromOptions.value = ToOptions.value = allDestinations;
    };

    const filterToFn = (val, update) => {
      update(() => {
        if (val === "") {
          // do nothing
        } else {
          const flightvalue = val.toLowerCase();
          ToOptions.value = ToOptions.value.filter(
            (v) => v.label.toLowerCase().indexOf(flightvalue) > -1
          );
        }
      });
    };

    const filterFromFn = (val, update) => {
      update(() => {
        if (val === "") {
          // do nothing
        } else {
          const flightvalue = val.toLowerCase();
          FromOptions.value = FromOptions.value.filter(
            (v) => v.label.toLowerCase().indexOf(flightvalue) > -1
          );
        }
      });
    };

    onMounted(async () => {
      // create options
      createOptionsFromFLights();
    });

    return {
      searchForFlight,
      filterToFn,
      filterFromFn,
      TripOptions,
      classOptions,
      FromOptions,
      ToOptions,
      flight_params,
      showArrival,
    };
  },
};
</script>

<style lang="css" scoped>
.max-width {
  max-width: unset;
  width: 100% !important;
}

.container {
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;
}
.search-btn {
  font-size: 17px;
}

.message_body {
  font-size: 30px;
}

.out-cast {
  border-right: unset !important;
}
</style>
