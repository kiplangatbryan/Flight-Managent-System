<script setup>
import { ref, watch, onBeforeUpdate } from "vue";
import { useAppStore } from "@/stores/main";

defineProps(["class_type", "price", "seats"]);
const emit = defineEmits(["update-key"]);

var select = ref("select");
const check = ref(false);

const store = useAppStore();
const { updateAppState, confirmPackage } = store;

const updateState = (val) => (select.value = val);

watch(check, (newVal, oldVal) => {
  if (newVal) {
    updateState("selected");
    updateAppState("flightTab");
    confirmPackage(true);
  } else {
    updateState("select");
    updateAppState("flightTab");
    confirmPackage(false);
  }
});
onBeforeUpdate(() => {
  // reload component
  emit("update-key");
});
</script>

<template>
  <q-card bordered flat class="custom-box">
    <q-item-section class="bg-grey-3 q-py-md">
      <div class="text-center domain">
        <q-checkbox
          v-model="check"
          checked-icon="task_alt"
          unchecked-icon="panorama_fish_eye"
          :label="select"
        />
        <div class="text-small">KES</div>
        <div class="text-h6">{{ price }}</div>
        <div class="package-title">{{ class_type }} flex</div>
        <div class="seats-alert">{{ seats }} seats Left</div>
      </div>
    </q-item-section>
    <q-item-section>
      <div class="row q-py-md q-gutter-sm">
        <div class="col-12">
          <div class="row q-gutter-sm items-start fender">
            <div class="col-1"><q-icon name="people" /></div>
            <div class="col-8">Refund refundable at no fee</div>
          </div>
        </div>

        <div class="col-12">
          <div class="row q-gutter-sm items-start fender">
            <div class="col-1"><q-icon name="people" /></div>
            <div class="col-9">Free bag allowance 2pc- 32kg</div>
          </div>
        </div>

        <div class="col-12">
          <div class="row q-gutter-sm items-start fender">
            <div class="col-1"><q-icon name="people" /></div>
            <div class="col-8">Launge Service Free</div>
          </div>
        </div>

        <div class="col-12">
          <div class="row q-gutter-sm items-start fender">
            <div class="col-1"><q-icon name="people" /></div>
            <div class="col-8">Changes within the same class: Free</div>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-card>
</template>

<style scoped>
.domain {
  position: relative;
}
.seats-alert {
  position: absolute;
  top: -35px;
  left: calc(50% - 45px);
  padding: 2px 0.8em;
  border-radius: 20px;
  color: #e97b2d;
  border: 0.5px solid #e97b2d;
  background: #dec2ae;
  font-size: 14px;
}

.custom-box {
  max-width: 230px;
}

.text-small {
  font-size: 13px;
}

.package-title {
  font-size: 15px;
}

.fender {
  font-size: 15px;
}
</style>
