<template>
  <main>
    <q-card flat bordered>
      <div class="row">
        <div class="col">
          <q-list padding class="border_tink">
            <q-item>
              <q-item-section>
                <q-item-label>FROM</q-item-label>
                <q-item-label title>
                  <q-select
                    dense
                    v-model="flight_params.from"
                    :options="FromOptions"
                    label="Where are You From?"
                    color="teal"
                    outlined
                    clearable
                    class="bg-white"
                    options-selected-class="text-deep-orange"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-label>

                <q-item-label caption> Nairobi, London, Egypt </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col">
          <q-list padding class="border_tink">
            <q-item>
              <q-item-section>
                <q-item-label>TO</q-item-label>
                <q-item-label title>
                  <q-select
                    dense
                    outlined
                    v-model="flight_params.from"
                    :options="ToOptions"
                    label="Headed Here"
                    color="teal"
                    clearable
                    options-selected-class="text-deep-orange"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-label>
                <q-item-label caption> New York, Australia </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <!-- type of trip -->
        <div class="col-md">
          <q-list padding class="border_tink">
            <q-item>
              <q-item-section>
                <q-item-label>Trip</q-item-label>
                <q-item-label title>
                  <q-select
                    dense
                    outlined
                    v-model="flight_params.trip_type"
                    :options="TripOptions"
                    label="Headed Here"
                    color="teal"
                    clearable
                    options-selected-class="text-deep-orange"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-label>
                <q-item-label caption> New York, Australia </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <!-- date select -->
        <div class="col">
          <q-list padding class="border_tink">
            <q-item>
              <q-item-section>
                <q-item-label>Departure</q-item-label>
                <q-item-label title>
                  <q-select
                    dense
                    outlined
                    v-model="flight_params.departure"
                    :options="DepartOptions"
                    label="Headed Here"
                    color="teal"
                    clearable
                    options-selected-class="text-deep-orange"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-label>
                <q-item-label caption> New York, Australia </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <div class="col">
          <q-list padding class="border_tink">
            <q-item>
              <q-item-section>
                <q-item-label>Arrival</q-item-label>
                <q-item-label title>
                  <q-select
                    dense
                    outlined
                    v-model="flight_params.arrival"
                    :options="options"
                    label="Headed Here"
                    color="teal"
                    clearable
                    options-selected-class="text-deep-orange"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <q-item-label>{{ scope.opt.label }}</q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                </q-item-label>
                <q-item-label caption> New York, Australia </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card>
    <div class="row items-end">
      <div class="col-4">
        <q-btn
          to="/explore"
          color="dark"
          style="font-size: 20px"
          no-caps
          outline
          label="Search Flight"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      console.log("mounted");
    });

    return {
      TripOptions: ref([
        {
          label: "Two Way",
          value: "return",
        },
        {
          label: "One Way",
          value: "direct",
        },
        {
          label: "Multi City",
          value: "city",
        },
      ]),
      flight_params: ref({
        arrival: null,
        departure: null,
        from: null,
        to: null,
        trip_type: null,
      }),

      FromOptions: [
        {
          label: "Nairobi, Kenya",
          value: "Nairobi_KE",
        },
        {
          label: "New York, USA",
          value: "Newyork_USA",
        },
        {
          label: "Cape Town, South Africa",
          value: "capetown_SA",
        },
        {
          label: "Lagos, Nigeria",
          value: "lagos",
        },
        {
          label: "Tunis, Tunisia",
          value: "tunis",
        },
      ],

      ToOptions: [
        {
          label: "Nairobi, Kenya",
          value: "Nairobi_KE",
        },
        {
          label: "New York, USA",
          value: "Newyork_USA",
        },
        {
          label: "Cape Town, South Africa",
          value: "capetown_SA",
        },
        {
          label: "Lagos, Nigeria",
          value: "lagos",
        },
        {
          label: "Tunis, Tunisia",
          value: "tunis",
        },
      ],
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
</style>
