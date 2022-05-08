import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'main',
  state: () => ({
    searchShow: false,
    bookingState: false,
    booking: { passengers: 1, },
    destinations: [
      { name: "Nairobi", country: 'Kenya', alias: "NBO" },
      { name: "seatle", country: 'United States', alias: "SEA" },
      { name: "Moscow", country: 'Russia', alias: "RU" },
      { name: "Mombasa", country: 'Kenya', alias: "KE" },
      { name: "Eldoret", country: "Kenya", alias: "KE" },
      { name: "Mogadishu", country: "Somalia", alias: "SOM" },
      { name: "Sydney", country: "Australia", alias: "AUS" },
    ],
    flights: [
      {
        origin: { name: "Nairobi", country: 'Kenya', alias: "NBO" },
        destination: { name: "seatle", country: 'United States', alias: "SEA" },
        packages: [{ name: 'Economy', price: '362, 510' }, { name: 'Business', price: '485, 150' },],
        stops: 1,
      },
      {
        origin: { name: "Moscow", country: 'Russia', alias: "RU" },
        destination: { name: "Eldoret", country: "Kenya", alias: "KE" },
        packages: [{ name: 'Economy', price: '362, 510' }, { name: 'Business', price: '485, 150' },],

        stops: 1,
      },
      {
        origin: { name: "Mombasa", country: 'Kenya', alias: "KE" },
        destination: { name: "Mogadishu", country: "Somalia", alias: "SOM" },
        packages: [{ name: 'Economy', price: '362, 510' }, { name: 'Business', price: '485, 150' },],
        stops: 1,
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
    },
  }
})
