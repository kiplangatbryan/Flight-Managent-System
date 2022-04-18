<template>
  <div class="seat" :class="[occupied ? 'taken' : 'not-taken']">
    <q-tooltip :offset="[0, 8]">{{ seatId }}</q-tooltip>
  </div>
</template>

<script>
export default {
  name: "seatCMP",
  props: {
    seatId: {
      required: true,
      type: String,
    },
    occupied: {
      require: true,
      type: Boolean,
    },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="css" scoped>
.not-taken {
  background: var(--vt-c-indigo);
}
.active {
  background: var(--main-accent-color);
}

.taken {
  background: var(--vt-c-white-mute);
}

.seat {
  border-radius: 50px;
  height: 50px;
  width: 50px;
}
</style>
