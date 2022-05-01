<template>
  <main>
    <q-card flat bordered>
      <div class="row">
        <div class="col">
          <q-list padding class="border_tink">
            <q-item>
              <q-item-section>
                <q-item-label>Booking Reference Number</q-item-label>
                <q-item-label title>
                  <q-select
                    dense
                    v-model="model"
                    :options="options"
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
          <q-list bordered padding class="border_tink">
            <q-item>
              <q-item-section>
                <q-item-label>Last Name</q-item-label>
                <q-item-label title>
                  <q-select
                    dense
                    outlined
                    v-model="model"
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
        <!-- type of trip -->
      </div>
    </q-card>
    <div class="row">
      <div class="flex-end">
        <q-btn
          to="/explore"
          color="orange"
          style="font-size: 20px"
          no-caps
          label="Check In &#10230;"
        />
      </div>
    </div>
  </main>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      model: ref(null),

      options: [
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
