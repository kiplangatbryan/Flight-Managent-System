<template>
  <div class="card__main shadow-1">
    <div class="card-img-cont">
      <img :src="imageFunc(index + 1)" />
    </div>
    <div class="card_body">
      <div class="text-h5 q-mb-sm">
        {{ city }}
      </div>

      <div class="subtitle-text">{{ class_bs }} from</div>
      <div class="row items-start text-bold">
        <div class="currency">KES</div>
        <div class="text-h5 q-ml-sm">{{ price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["class_bs", "city", "price", "index"]);

const imageFunc = (index) => {
  return `src/assets/png-${index}.jpg`;
};
</script>

<style scoped>
.card__main {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  width: fit-content;
}
.currency {
  font-size: 12px;
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
