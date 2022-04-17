<template>
  <div class="card__main">
    <q-dialog
      v-model="searchShow"
      transition-show="fade"
      transition-hide="fade"
    >
      <q-card>
        <q-card-section>
          <div class="text-h4">What are you looking for ?</div>
          <div class="subtitle-text1">Let us help you find it</div>
        </q-card-section>

        <q-card-section>
          <q-input type="search" outlined v-model="search" @keyup="searchQuery">
            <template v-slot:hint> Field Hint </template>
          </q-input>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="close" @click="searchToggle" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAppStore } from "@/stores/main";
import { storeToRefs } from "pinia";

export default {
  components: {},
  setup() {
    const search = ref(null);
    const searchQuery = function () {
      console.log(search.value);
    };

    const store = useAppStore();

    const { searchShow } = storeToRefs(store);

    const { searchToggle } = store;

    return {
      search,
      searchQuery,
      searchShow,
      searchToggle,
    };
  },
};
</script>

<style scoped>
.card__main {
  min-width: 400px;
}
</style>
