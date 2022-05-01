<template>
  <div class="card__main shadow-2">
    <div class="card-img-cont">
      <img :src="imgUrl" />
    </div>
    <div class="card_body">
      <div class="text-h5 q-mb-sm">
        {{ city }}
      </div>

      <div class="subtitle-text">Economy from</div>
      <div class="row items-start text-bold">
        <div class="currency">KES</div>
        <div class="text-h5 q-ml-sm">308,400</div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from "vue";
// import { useAppStore } from "@/stores/main";
// import { storeToRefs } from "pinia";

export default {
  components: {},
  defineProps: {
    flightId: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {
      imgUrl: "src/assets/png-2.jpg",
      country: "kenya",
      city: "Nairobi",
      msg: "The Hallow Ruins Of Tangor",
    };
  },
};
</script>

<style scoped>
.card__main {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.currency {
  font-size: 14px;
  margin-top: 3px;
}

.card__main img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}
.card_body {
  padding: 0.5em 1.5em;
}
</style>
