<script setup>
import KQNavigation from "@/components/KQNavigation.vue";
import FooterKQ from "@/components/FooterKQ.vue";
import TabFlight from "@/components/TabFlight.vue";

import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";




</script>

<template>
  <div class="body">
    <KQNavigation />
    <TabFlight />
    
    <section class="bg-grey-1">

    </section>
    <FooterKQ />
  </div>
  
</template>

<style lang="css" scoped>
.main_nav {
  background: #000;
}

.content {
  padding: 2em 10em;
  min-height: 50vh;
}
.adjust-step {
  font-size: 20px !important;
}
.btn-custom {
  font-size: 14px;
}
.fix-font {
  font-size: 15px;
}

.switch-block {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.sum-title {
  font-size: 17px;
}

.kq-btn {
  font-size: 20px;
  font-weight: bold;
}
.custom-box {
  width: 100%;
  border-radius: 10px;
}

.b-layout-fix {
  gap: 8px !important;
}

.max-width {
  max-width: unset;
}

.rounded {
  border-radius: 20px;
}

.counter {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  margin-top: 7px;
  margin-left: -3px;
  margin-right: 18px;
}

.line-pack {
  position: relative;
}

.line-pack::before {
  content: "";
  position: absolute;
  background: grey;
  left: -26px;
  width: 2px;
  top: 25px;
  bottom: calc(50% + 25px);
  height: calc(50% - 3px);
}
</style>
