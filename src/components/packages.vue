<script>
export default {
  setup() {
    return {};
  },
};
</script>

<template>
  <q-card bordered flat class="bg-grey-5">
    <div class="row q-pa-md items-between">
      <div class="col-6 row items-between no-wrap">
        <div class="col-4 from">
          <div class="text-h6">1845 NBO</div>
          <div class="subtitle-text3">Nairobi</div>
        </div>
        <div class="col-4 timeline text-center">
          <q-icon name="flight" size="14px" class="change_angle" />
          <div class="special_text">15hrs 22min</div>
          <div class="special_text">1 stops(s)</div>
        </div>
        <div class="col-4 text-right to">
          <div class="text-h6">2345 SEA</div>
          <div class="subtitle-text3">Seattle</div>
        </div>
      </div>
      <!-- offers here -->
      <div class="col-auto"></div>
    </div>
  </q-card>
</template>

<style lang="css" scoped>
.subtitle-text3 {
  font-size: 16px !important;
}
.special_text {
  font-size: 12px;
}
.change_angle {
  transform: rotate(90deg);
}

.timeline {
  line-height: 1.1;
}
</style>