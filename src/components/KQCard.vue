<template>
  <div class="card__main">
    <img :src="imgUrl" />
    <div class="row items-center q-pa-md location text-white">
      <q-icon size="20" name="location" />
      <div class="content">
        <div class="text-h5">
          {{ country }}
        </div>
        <div class="subtitle-text">
          {{ city }}
        </div>
      </div>
    </div>
    <div class="card-actions q-pa-md text-white">
      <div class="text-h4 q-mb-lg">
        {{ msg }}
      </div>
      <q-btn label="Book Now" rounded outline color="secondary" no-caps />
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
  min-width: 100%;
  position: relative;
}
.card__main img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.card__main .location {
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
}
.card__main .card-actions {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
