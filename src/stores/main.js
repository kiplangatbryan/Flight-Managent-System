import { defineStore } from 'pinia'
import moment from "moment";

export const useAppStore = defineStore({
  id: 'main',
  state: () => ({
    searchShow: false,
    bookingState: false,
    booking: { passengers: 1, },
    destinations: [
      { name: "Nairobi", country: 'Kenya', alias: "NBO" },
      { name: "Seatle", country: 'United States', alias: "SEA" },
      { name: "Moscow", country: 'Russia', alias: "RU" },
      { name: "Mombasa", country: 'Kenya', alias: "KE" },
      { name: "Eldoret", country: "Kenya", alias: "KE" },
      { name: "Mogadishu", country: "Somalia", alias: "SOM" },
      { name: "Sydney", country: "Australia", alias: "AUS" },
    ],
    routes: [
      {
        depart: new Date(Date.now() + 1 * 60 * 60 * 1000),
        from: { name: "Nairobi", country: 'Kenya', alias: "NBO" },
        to: { name: "Seatle", country: 'United States', alias: "SEA" },
        packages: [{ name: 'Economy', price: '362, 510' }, { name: 'Business', price: '485, 150' },],
        stops: 1,
      },
      {
        depart: new Date(Date.now() + 3 * 60 * 60 * 1000),
        from: { name: "Mombasa", country: 'Kenya', alias: "KE" },
        to: { name: "Seatle", country: 'United States', alias: "SEA" },
        packages: [{ name: 'Economy', price: '362,510' }, { name: 'Business', price: '485,150' },],
        stops: 1,
      },
      {
        depart: new Date(Date.now() + 8 * 60 * 60 * 1000),
        from: { name: "Mombasa", country: 'Kenya', alias: "KE" },
        to: { name: "Nairobi", country: 'Kenya', alias: "NBO" },
        packages: [{ name: 'Economy', price: '5,880' }, { name: 'Business', price: '8,750' },],
        stops: 1,
      },
      {
        depart: new Date(Date.now() + 2 * 60 * 60 * 1000),
        from: { name: "Mogadishu", country: "Somalia", alias: "SOM" },
        to: { name: "Sydney", country: "Australia", alias: "AUS" },
        packages: [{ name: 'Economy', price: '462,510' }, { name: 'Business', price: '585,150' },],
        stops: 1,
      },
      {
        depart: new Date(Date.now() + 5 * 60 * 60 * 1000),
        from: { name: "Eldoret", country: "Kenya", alias: "KE" },
        to: { name: "Moscow", country: 'Russia', alias: "RU" },
        packages: [{ name: 'Economy', price: '232,550' }, { name: 'Business', price: '385,450' },],
        stops: 1,
      }
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
    async getFlights() {
      return new Promise((resolve, reject) => {
        setTimeout(function () {
          resolve(this.routes)
        }, 500)
      })
    },

    async searchFlight({ from, to, departure, class_type }) {
      const flights = await getFlights()

      const formatKey = function (obj) {
        return obj.name + "_" + obj.alias
      }

      const compareDate = (depart) => {
        if (new Date(depart) > new Date(departure)) return true

        return false
      }

      const findClass = (packages) => {
        if (class_type == 'all') return true

        return packages.includes(class_type)

      }
      const result = flights.find((el) => {
        if (formatKey(el.from) == from && formatKey(el.to) == to && findClass(el.packages) && compareDate(departure)) {
          return true
        }
      })

      if (result == undefined) return false
      return true
    }
  }
})
