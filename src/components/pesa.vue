<template>
  <div class="text-left">
    <div class="text-h5 q-mt-lg">Ticket Order Payment</div>
    <div class="kq-spacing q-mt-lg">
      You need to make a commitment to take the flight within the hour
    </div>

    <q-card
      bordered
      flat
      class="kq-spacing kq-info q-pa-md"
      style="max-width: 350px"
    >
      <div class="kq-spacing row items-center border-1">
        <q-icon name="lock" size="20" color="orange" />
        <span class="q-ml-lg">Secure Payment</span>
      </div>
      <div class="subtitle-text3">
        Pay your flight fees securely via mpesa. Your payment is going through a
        secure channel. Feel Free
      </div>
    </q-card>

    <div class="row items-start kq-spacing">
      <div class="kq_font_size text-bold">KES</div>
      <div class="text-h3">460, 555</div>
    </div>

    <div class="box kq-spacing" style="max-width: 300px">
      <q-input
        label="Your Phone Number"
        stack-label
        flat
        outlined
        type="text"
        bg-color="white"
        v-model="phone"
        :rules="[
          (val) => (val && val.length == 10) || 'Enter a valid phone number',
        ]"
      />
    </div>

    <div class="kq-spacing kq_font_size">
      <q-checkbox v-model="checked" />
      <span>
        I accept the <span class="kq_dash">terms and conditions</span> and
        <span class="kq_dash">courier charges</span>
      </span>
    </div>

    <q-btn label="Process Payment" no-caps color="red" icon="lock" />
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  name: "mpesaPay",
  setup() {
    onMounted(() => {});
    const phone = ref(null);

    const checked = ref(false);

    return {
      phone,
      checked,
    };
  },
};
</script>

<style lang="css" scoped>
.kq-spacing {
  margin-bottom: 1.5em !important;
}

.kq_dash {
  border-bottom: 2px solid #000;
  margin-bottom: 5px;
}

.kq-info {
  background: #fcff668a;
  font-size: 15px;
}

.kq_font_size {
  font-size: 15px;
}
</style>
