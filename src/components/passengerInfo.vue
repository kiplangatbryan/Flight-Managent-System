<template>
  <div class="parent">
    <q-card bordered flat>
      <q-form @submit.prevent="validate">
        <div v-for="index in booking.passengers" :key="index">
          <q-card-section>
            <div class="text-h6">{{ title }}</div>
            <div class="subtitle-text1 q-mb-md">Basic Information</div>
            <div class="form-card">
              <div class="row q-gutter-sm q-mb-md">
                <div class="col-6">
                  <q-select
                    outlined
                    v-model="form.options"
                    :options="titleOptions"
                    label="Title"
                    color="teal"
                    class="col-4"
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
                </div>

                <div class="col-5">
                  <q-select
                    outlined
                    v-model="form.gender"
                    :options="genderOptions"
                    label="Gender"
                    color="teal"
                    class="col-4"
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
                </div>
              </div>

              <div class="row q-gutter-sm">
                <div class="col-6">
                  <q-input
                    v-model="form.firtName"
                    type="text"
                    label="First Name"
                    bg-color="white"
                    lazy-rules
                    stack-label
                    outlined
                    :rules="[
                      (val) => (val && val.length > 0) || 'Enter a valid name',
                    ]"
                  />
                </div>
                <div class="col-5">
                  <q-input
                    v-model="form.lastName"
                    type="text"
                    label="Last Name"
                    bg-color="white"
                    lazy-rules
                    stack-label
                    outlined
                    :rules="[
                      (val) => (val && val.length > 0) || 'Enter a valid name',
                    ]"
                  />
                </div>
              </div>
              <div class="row q-gutter-sm">
                <div class="col-6">
                  <q-input
                    v-model="form.nationality"
                    type="email"
                    label="Nationality"
                    bg-color="white"
                    lazy-rules
                    class="max-width"
                    stack-label
                    outlined
                    :rules="[
                      (val) =>
                        (val && val.length > 0) ||
                        'Enter a valid Email address',
                    ]"
                  />
                </div>
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div class="subtitle-text1">Contact Information</div>
            <div class="row q-gutter-sm">
              <div class="col-6">
                <q-input
                  v-model="form.email"
                  type="email"
                  label="Email address"
                  bg-color="white"
                  lazy-rules
                  stack-label
                  class="max-width"
                  outlined
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Enter a valid Email address',
                  ]"
                />
              </div>
              <div class="col-5">
                <q-input
                  v-model="form.phone"
                  type="text"
                  label="Phone Number"
                  bg-color="white"
                  lazy-rules
                  stack-label
                  class="max-width"
                  outlined
                  :rules="[
                    (val) =>
                      (val && val.length >= 10) || 'Enter a valid Phone Number',
                  ]"
                />
              </div>
            </div>
          </q-card-section>
        </div>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";

export default {
  name: "passengers",
  methods: {
    validate() {},
  },
  setup() {
    const form = ref({});
    const title = ref("Passenger");
    const store = useAppStore();

    const { booking } = storeToRefs(store);

    return {
      title,
      flight_params: ref(""),
      booking,
      titleOptions: [
        {
          label: "Mr",
          value: "Mr",
        },
        {
          label: "Mrs",
          value: "Mrs",
        },
      ],
      genderOptions: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
        {
          label: "Other",
          value: "other",
        },
      ],
      form,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>