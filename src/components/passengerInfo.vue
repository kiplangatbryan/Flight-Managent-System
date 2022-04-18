<template>
  <div class="parent">
    <q-card bordered flat>
      <q-card-section>
        <div class="text-h6">
          {{ title }}
        </div>
        <div class="subtitle-text1">Basic Information</div>
        <div class="form-card">
          <div class="row q-gutter-sm">
            <div class="col-6">
              <q-input
                v-model="subscribe"
                type="text"
                label="First Name"
                bg-color="white"
                lazy-rules
                class="max-width"
                stack-label
                outlined
                :rules="[
                  (val) => (val && val.length > 0) || 'Enter a valid name',
                ]"
              />
            </div>
            <div class="col-5">
              <q-input
                v-model="subscribe"
                type="text"
                label="Last Name"
                bg-color="white"
                lazy-rules
                class="max-width"
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
                v-model="subscribe"
                type="radio"
                label="Subscribe"
                bg-color="white"
                lazy-rules
                class="max-width"
                stack-label
                outlined
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Enter a valid Email address',
                ]"
              />
            </div>
            <div class="col-5">
              <q-input
                v-model="subscribe"
                type="text"
                label="Subscribe"
                bg-color="white"
                lazy-rules
                class="max-width"
                stack-label
                outlined
                placeholder="Your Email Address"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Enter a valid Email address',
                ]"
              />
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div class="col-6">
              <q-input
                v-model="subscribe"
                type="text"
                label="Subscribe"
                bg-color="white"
                lazy-rules
                class="max-width"
                stack-label
                outlined
                placeholder="Your Email Address"
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Enter a valid Email address',
                ]"
              />
            </div>
            <div class="col-5">
              <q-input
                v-model="subscribe"
                type="text"
                label="phone njumber"
                bg-color="white"
                lazy-rules
                class="max-width"
                outlined
                stack-label
                placeholder="Your Phone Number"
                :rules="[
                  (val) =>
                    (val && val.length >= 10) || 'Enter a valid Phone Number',
                ]"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card-section>
      <div class="text-h6">
        {{ title }}
      </div>
      <div class="subtitle-text1">Contact Information</div>
    </q-card-section>
    <q-card-section>
      <div class="row q-gutter-sm">
        <div class="col-6">
          <q-input
            v-model="subscribe"
            type="email"
            label="Email address"
            bg-color="white"
            lazy-rules
            stack-label
            class="max-width"
            outlined
            placeholder="Your Email Address"
            :rules="[
              (val) => (val && val.length > 0) || 'Enter a valid Email address',
            ]"
          />
        </div>
        <div class="col-5">
          <q-input
            v-model="subscribe"
            type="text"
            label="phone number"
            bg-color="white"
            lazy-rules
            stack-label
            class="max-width"
            outlined
            placeholder="Your Phone Number"
            :rules="[
              (val) =>
                (val && val.length >= 10) || 'Enter a valid Phone Number',
            ]"
          />
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    return {
      title: ref("Passenger 1"),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>