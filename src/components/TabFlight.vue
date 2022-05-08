<template>
  <main>
    <q-card flat>
      <q-card-section>
        <div class="row q-gutter-md">
          <div class="col-3 row">
            <div class="col-12">
              <q-select
                v-model="flight_params.from"
                :options="FromOptions"
                label="From"
                outlined
                flat
                @input-value="filterOptions"
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
                label="To"
                outlined
                @input-value="filterOptions"
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
                v-model="flight_params.trip_type"
                :options="TripOptions"
                label="Trip"
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
            <div class="col-12">
              <q-select
                v-model="flight_params.class"
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
                  (val) => (val && val.length > 0) || 'Enter a departure date',
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
              icon="fly"
              class="btn-kq"
              color="primary"
              no-caps
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </main>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useAppStore } from "@/stores/main";

export default {
  name: "tabFlight",
  // watch: {
  //   flight_params: {
  //     // make resets
  //     handler(newValue, oldValue) {
  //       console.log(newValue.from);
  //       if (newValue.from !== null) {
  //         this.filterOptions("to");
  //       }
  //       this.filterOptions("from");

  //       console.log(this.FromOptions);
  //       console.log(this.ToOptions);
  //     },
  //     deep: true,
  //   },
  // },
  setup() {
    const store = useAppStore();
    var FromOptions = ref([]);
    var ToOptions = ref([]);
    var allDestinations = null;
    var flight_params = ref({
      arrival: null,
      departure: null,
      from: null,
      to: null,
      trip_type: null,
    });

    const { destinations } = store;

    // watch the state of input change
    const createOptionsFromFLights = () => {
      // all flights
      allDestinations = destinations.map((destination) => {
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

    // const filterOptions = (option_type) => {
    //   const result = indexFilter(option_type);
    //   console.log(result.value);
    //   const filteredOptions = result.value.filter((option) => {
    //     if (option.value == flight_params.value[option_type]) {
    //       return false;
    //     }
    //   });

    //   if (option_type == "to") {
    //     ToOptions = filteredOptions;
    //   } else if (option_type == "from") {
    //     FromOptions = filteredOptions;
    //   }
    // };

    const filterToFn = (val, update) => {
      update(() => {
        if (val === "") {
          // do nothing
        } else {
          const flightvalue = val.toLowerCase();
          console.log(flightvalue);
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
      filterOptions,
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
          value: "economy",
        },
        {
          label: "Business",
          value: "business",
        },
        {
          label: "First Class",
          value: "first_class",
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
