<template>
  <div class="container">
    <div class="max-width">
      <div class="text-h5">Find a flight</div>
    </div>
    <div class="row q-gutter-sm max-width justify-between">
      <div class="col-5 row">
        <div class="col-6">
          <q-select
            v-model="flight_params.from"
            :options="FromOptions"
            label="From"
            outlined
            flat
            class="bg-white"
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
            label="To"
            outlined
            flat
            class="bg-white"
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

      <div class="col-4 row">
        <div class="col-5">
          <q-input
            v-model="flight_params.passengers"
            type="text"
            label="No. of passengers"
            outlined
            flat
            class="bg-white"
            :rules="[
              (val) =>
                (typeof val && val.length > 0) || 'Enter a departure date',
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
        <div class="col-6">
          <q-select
            v-model="flight_params.class_type"
            :options="classOptions"
            label="class"
            outlined
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

      <div class="col-2 row">
        <div class="col-auto">
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

        <div class="col-6" v-if="flight_params.trip_type">
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
    </div>
    <div class="row justify-between max-width">
      <div>
        <div class="text-h6">Type of trip</div>
        <div>
          <q-toggle
            v-model="flight_params.trip_type"
            icon="round"
            label="Round Trip"
          />
        </div>
      </div>

      <div class="justify-self-end">
        <q-btn
          label="Search Flight"
          icon="search"
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

  setup() {
    var FromOptions = ref([]);
    var ToOptions = ref([]);
    var allDestinations = null;
    var flight_params = ref({
      arrival: null,
      departure: null,
      from: null,
      to: null,
      trip_type: false,
      class_type: null,
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
      TripOptions: ref([
        {
          label: "Two Way",
          value: "return",
        },
        {
          label: "One Way",
          value: "direct",
        },
      ]),
      classOptions: [
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
      ],
      FromOptions,
      ToOptions,
      flight_params,
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
</style>
