<template>
  <main>
    <q-card flat>
      <q-card-section>
        <div class="row q-mb-sm">
          <div class="col-3 q-pa-sm bg-grey-4 round-3">
            <!-- default is two way -->
            <q-toggle
              v-model="flight_params.trip_type"
              icon="sync"
              label="Round Trip"
            />
            <div>{{ trip_label }}</div>
          </div>
        </div>
        <q-form @submit="searchFunc">
          <div class="row q-gutter-md">
            <div class="col-3 row">
              <div class="col-12">
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
              <div class="col-12">
                <q-select
                  v-model="flight_params.to"
                  :options="ToOptions"
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

            <div class="col-3 row">
              <div class="col-12">
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

            <div class="col-3 row">
              <div class="col-12">
                <q-input
                  v-model="flight_params.departure"
                  type="date"
                  label="Departure"
                  bg-color="white"
                  lazy-rules
                  stack-label
                  outlined
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Enter a departure date',
                  ]"
                >
                </q-input>
              </div>

              <div class="col-12">
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
                label="Find Flight"
                icon="flight_takeoff"
                class="btn-kq"
                color="primary"
                type="submit"
                no-caps
                @click="searchForFlight"
              ></q-btn>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </main>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useAppStore } from "@/stores/main";
import { QSpinnerCube, useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

export default {
  name: "tabFlight",
  watch: {
    "flight_params.trip_type"(val, old) {
      if (val) this.trip_label = tripValues[val.toString];
      else this.trip_label = tripValues[val.toString];
    },
  },
  setup() {
    const store = useAppStore();
    var FromOptions = ref([]);
    const trip_pabel = ref("Round Trip");
    const tripValues = {
      true: "Round Trip",
      false: "One Way",
    };
    var ToOptions = ref([]);
    var allDestinations = null;
    var flight_params = ref({
      arrival: null,
      departure: null,
      from: null,
      to: null,
      passengers: null,
      trip_type: true,
      class_type: null,
    });

    const { searchFlight, updatePageState } = store;
    const { destinations } = storeToRefs(store);
    const router = useRouter();

    const qua = useQuasar();

    const searchForFlight = async () => {
      qua.loading.show({
        message: "We are searching for your flight",
        messageColor: "black",
        spinnerColor: "red",
        spinner: QSpinnerCube,
      });
      const q = await searchFlight(flight_params.value);
      if (!q) {
        // show alert box
        alert("flight no found!");
        qua.loading.hide();

        return;
      }
      updatePageState();

      qua.loading.hide();

      router.push({
        name: "booking",

        query: {
          redirect: "true",
        },
      });
    };

    // watch the state of input change
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

    const indexFilter = function (option_type) {
      /**
       * @param options_type
       * @description return object containing array associated with option
       */
      const match = {
        to: ToOptions,
        from: FromOptions,
      };
      return match[option_type];
    };

    const filterOptions = (option_type) => {
      const result = indexFilter(option_type);
      console.log(result.value);
      const filteredOptions = result.value.filter((option) => {
        if (option.value == flight_params.value[option_type]) {
          return false;
        }
      });

      if (option_type == "to") {
        ToOptions = filteredOptions;
      } else if (option_type == "from") {
        FromOptions = filteredOptions;
      }
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
      tripValues,
      filterToFn,
      trip_pabel,
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
</style>
