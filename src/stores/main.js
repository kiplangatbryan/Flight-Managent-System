import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'main',
  state: () => ({
    searchShow: false,
    bookingState: false,
    seats: [
      {
        seatId: "A01",
        occupied: false,
      },
      {
        seatId: "A02",
        occupied: false,
      },
      {
        seatId: "A03",
        occupied: false,
      },
      {
        seatId: "A04",
        occupied: false,
      },
      {
        seatId: "A05",
        occupied: false,
      },
      {
        seatId: "A06",
        occupied: false,
      },
      {
        seatId: "A07",
        occupied: false,
      },
      {
        seatId: "A08",
        occupied: false,
      },
      {
        seatId: "A09",
        occupied: false,
      }, {
        seatId: "A10",
        occupied: false,
      }, {
        seatId: "A11",
        occupied: false,
      }, {
        seatId: "A12",
        occupied: false,
      },
    ],
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
