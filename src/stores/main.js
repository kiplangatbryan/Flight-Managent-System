import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'main',
  state: () => ({
    searchShow: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    searchToggle() {
      if (this.searchShow) this.searchShow = false
      else this.searchShow = true
    }
  }
})
