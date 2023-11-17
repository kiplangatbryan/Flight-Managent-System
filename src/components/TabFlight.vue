<template>
  <main>
    <q-card flat>
      <q-card-section>
        <q-form @submit.prevent="getFlight">
          <div class="row q-mb-sm q-gutter-lg k-margin">
            <div class="col-8 col-lg-2 col-md-3">
              <!-- default is two way -->
              <q-select
                v-model="flight_params.trip_type"
                :options="TripOptions"
                flat
                borderless
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
            </div>

            <div class="col-12 col-lg-2 col-md-3">
              <!-- class option -->
              <q-select
                v-model="flight_params.class_type"
                :options="classOptions"
                flat
                borderless
                class="bg-white"
                @filter="filterFromFn"
              >
              </q-select>
              <div>{{ trip_label }}</div>
            </div>

            <div class="col-12 col-lg-3 col-md-3">
              <q-input
                v-model="flight_params.passengers"
                type="number"
                label="passengers"
                borderless=""
                class="bg-white"
                :rules="[
                  (val) => val > 0 || 'Passenger no. cannot be less than 1',
                  (val) => val <= 10 || 'Passengers cannot exceed',
                ]"
              >
                <template v-slot:option="scope">
                  <q-item v-bind="scope.itemProps">
                    <q-item-section>
                      <q- item-label>{{ scope.opt.label }}</q->
                    </q-item-section>
                  </q-item>
                </template>
              </q-input>
            </div>
          </div>
          <div class="text-red" v-show="flight_params.warning">
            <q-icon name="warning"></q-icon> {{ flight_params.error_message }}
          </div>
          <div class="row q-gutter-lg items-start justify-start">
            <div class="col-12 col-sm-3">
              <q-select
                v-model="flight_params.depart"
                :options="routes.FromOptions"
                prefix="From"
                outlined
                flat
                options-cover
                use-chips
                class="bg-white"
                @filter="filterFromFn"
                input-debounce="0"
              >
                <template v-slot:selected-item="scope">
                  <q-chip
                    v-show="flight_params.depart"
                    square
                    color="secondary"
                    removable
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    text-color="white"
                    class="q-my-none q-ml-xs q-mr-none"
                  >
                    {{ scope.opt.label }}
                  </q-chip>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-sm-3">
              <q-select
                v-model="flight_params.destination"
                :options="routes.ToOptions"
                prefix="To"
                outlined
                flat
                use-chips
                options-cover
                class="bg-white"
                use-input
                @filter="filterToFn"
                input-debounce="0"
              >
                <template v-slot:selected-item="scope">
                  <q-chip
                    v-show="flight_params.destination"
                    square
                    color="secondary"
                    removable
                    @remove="scope.removeAtIndex(scope.index)"
                    :tabindex="scope.tabindex"
                    text-color="white"
                    class="q-my-none q-ml-xs q-mr-none"
                  >
                    {{ scope.opt.label }}
                  </q-chip>
                </template>
              </q-select>
            </div>
            <div class="col-12 col-sm-3">
              <q-input
                outlined
                readonly
                :model-value="timeline.from + ' - ' + timeline.to"
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date v-model="timeline" range>
                       
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-12 col-sm-2">
              <q-btn
                label="Explore"
                rounded="3"
                class="btn-kq"
                outline=""
                color="secondary"
                type="submit"
                no-caps
              ></q-btn>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </main>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import { useAppStore } from "@/stores/main";
import { QSpinnerCube, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const store = useAppStore();

const routes = reactive({
  FromOptions: [],
  ToOptions: [],
});

var flight_params = ref({
  depart: null,
  destination: null,
  passengers: 1,
  trip_type: "Return",
  class_type: "Economy",
  warning: false,
});

const timeline = ref({ from: '', to: '' });

watch(
  () => flight_params.value.trip_type,
  (val, old) => {
    if (val) {
    }
  }
);

const TripOptions = ref([
  {
    label: "Return",
    value: "return",
  },
  {
    label: "One Way",
    value: "oneway",
  },
]);

const classOptions = [
  {
    label: "Economy",
    value: "economy",
  },
  {
    label: "Business",
    value: "Business",
  },
  {
    label: "First Class",
    value: "First_Class",
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
      to: flight_params.value.destination?.value,
      from: flight_params.value.depart?.value,
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
  bcakground: var(--main-color) !important;
}

.k-margin {
  margin-left: 2px;
}
</style>
