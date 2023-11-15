<template>
  <main>
    <q-card flat>
      <q-card-section>
        <div class="row q-mb-sm q-gutter-sm k-margin">
          <div class="col-8 col-lg-4 col-md-4">
            <!-- default is two way -->
            <q-toggle
              v-model="flight_params.trip_type"
              icon="sync"
              label="Round Trip"
            />
            <div>{{ trip_label }}</div>
          </div>

          <div class="col-12 col-lg-4 col-md-6">
            <!-- class option -->
            <q-select
              v-model="flight_params.class_type"
              :options="classOptions"
              label="Your flight class"
              outlined
              flat
              class="bg-white"
              @filter="filterFromFn"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>{{ scope.opt.label }}</q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
            <div>{{ trip_label }}</div>
          </div>
        </div>
        <q-form @submit.prevent="getFlight">
          <div class="text-red" v-show="flight_params.warning">
            <q-icon name="warning"></q-icon> {{ flight_params.error_message }}
          </div>
          <div class="row q-gutter-sm align-items-center">
            <div class="col-12 col-lg-6 col-md-6 row q-gutter-sm">
              <div class="col-12 col-sm-5">
                <q-select
                  v-model="flight_params.from"
                  :options="routes.FromOptions"
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
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="flight_params.to"
                  :options="routes.ToOptions"
                  label="Where are you going?"
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

            <div class="col-12 col-lg-5 col-md-5 row q-gutter-sm">
              <div class="col-12 col-sm-5">
                <q-input
                  v-model="flight_params.departure"
                  type="date"
                  label="Departure"
                  bg-color="white"
                  lazy-rules
                  stack-label
                  outlined
                  :rules="[validateDeparture]"
                >
                </q-input>
              </div>

              <div class="col-12 col-sm-6" v-if="flight_params.trip_type">
                <q-input
                  v-model="flight_params.arrival"
                  type="date"
                  label="Arrival"
                  bg-color="white"
                  lazy-rules
                  stack-label
                  outlined
                  :rules="[validateArrival]"
                >
                </q-input>
              </div>
            </div>

            <div class="col-12 col-lg-5 col-md-5 row q-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="flight_params.passengers"
                  type="number"
                  label="passengers"
                  min="1"
                  class="bg-white"
                  :rules="[
                    (val) => val > 0 || 'Passenger no. cannot be less than 1',
                    (val) => val <= 10 || 'Passengers cannot exceed',
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
              <div class="col-12 col-sm-5 justify-end">
                <q-btn
                  label="Find Flight"
                  icon="flight_takeoff"
                  class="btn-kq"
                  color="primary"
                  type="submit"
                  no-caps
                ></q-btn>
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, watch, toRaw } from "vue";
import { useAppStore } from "@/stores/main";
import { QSpinnerCube, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const store = useAppStore();

const routes = reactive({
  FromOptions: [],
  ToOptions: [],
});

const trip_pabel = ref("Round Trip");
const tripValues = {
  true: "Round Trip",
  false: "One Way",
};
var flight_params = ref({
  arrival: null,
  departure: null,
  from: null,
  to: null,
  passengers: 1,
  trip_type: false,
  class_type: "Any",
  warning: false,
});

watch(flight_params.value.trip_type, (val, old) => {
  if (val) trip_label = tripValues[val.toString];
  else trip_label = tripValues[val.toString];
});

const TripOptions = ref([
  {
    label: "Two Way",
    value: "return",
  },
  {
    label: "One Way",
    value: "direct",
  },
]);

const classOptions = [
  {
    label: "Any",
    value: "Any",
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

const { searchFlight } = store;
const { destinations } = storeToRefs(store);
const router = useRouter();

const qua = useQuasar();

const validateDeparture = (val) => {
  if (flight_params.value.arrival) {
    return (
      (val &&
        new Date(val) < new Date(flight_params.value.arrival) &&
        new Date(flight_params.value.arrival) > new Date(Date.now())) ||
      "Enter a valid departure date"
    );
  }
  return (
    (val && new Date(val) > new Date(Date.now())) ||
    "Enter a valid departure date"
  );
};

const validateArrival = (val) => {
  if (flight_params.value.departure) {
    return (
      (val &&
        new Date(val) > new Date(flight_params.value.departure) &&
        new Date(val) > new Date(Date.now())) ||
      "Enter a valid departure date"
    );
  }
  return (val && val.length > 0) || "Enter a valid arrival date";
};
const getFlight = async () => {
  if (flight_params.value.warning) flight_params.value.warning = false;

  if (!flight_params.value.from?.value || !flight_params.value.to?.value) {
    flight_params.value.warning = true;
    flight_params.value.error_message =
      "Please set a valid to or from locations";
    return false;
  }

  if (flight_params.value.from?.value == flight_params.value.to?.value) {
    flight_params.value.warning = true;
    flight_params.value.error_message =
      "Cannot travel to and from the same destinations.";
    return false;
  }

  qua.loading.show({
    message: "We are searching for your flight",
    messageColor: "white",
    spinnerColor: "blue",
    spinner: QSpinnerCube,
  });

  const query = await searchFlight(flight_params.value);
  qua.loading.hide();
  if (!query) {
    window.alert("Could not find your flight");
    return false;
  }

  router.push({
    name: "booking",
    query: {
      to: flight_params.value.to?.value,
      from: flight_params.value.from?.value,
    },
  });
};

// watch the state of input change
const createOptionsFromFLights = () => {
  // all flights
  const allDestinations = destinations.value.map((destination) => {
    return {
      value: destination.alias,
      label: destination.name,
    };
  });

  routes.FromOptions = routes.ToOptions = allDestinations;
};

// const indexFilter = function (option_type) {
//   /**
//    * @param options_type
//    * @description return object containing array associated with option
//    */
//   const match = {
//     to: ToOptions,
//     from: FromOptions,
//   };
//   return match[option_type];
// };

const filterToFn = (val, update) => {
  update(() => {
    if (val === "") {
      // do nothing
      createOptionsFromFLights();
    } else {
      const flightvalue = val.toLowerCase();
      routes.ToOptions = routes.ToOptions.filter(
        (v) => v.label.toLowerCase().indexOf(flightvalue) > -1
      );
    }
  });
};

const filterFromFn = (val, update) => {
  update(() => {
    if (val === "") {
      // do nothing
      createOptionsFromFLights();
    } else {
      const flightvalue = val.toLowerCase();
      routes.FromOptions = routes.FromOptions.filter(
        (v) => v.label.toLowerCase().indexOf(flightvalue) > -1
      );
    }
  });
};

onMounted(async () => {
  // create options
  createOptionsFromFLights();
});
</script>

<style scoped>
.flight_to,
.flight_from {
  min-width: 300px;
}
.border_tink {
  border-radius: 4px;
}
.btn-kq {
  font-size: 19px;
}
.k-margin {
  margin-left: 2px;
}
</style>
