import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'main',
  state: () => ({
    searchShow: true,
    bookingState: false,
    intermediate: { data: [] },
    pageState: true,
    bookingStep: false,
    cardShow: false,
    fetched: false,
    activePackage: {},
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
        id: 1,
        depart: new Date(Date.now() + 1 * 60 * 60 * 1000),
        from: { name: "Nairobi", country: 'Kenya', alias: "NBO" },
        to: { name: "Seatle", country: 'United States', alias: "SEA" },
        packages: [{ name: 'Economy', price: '362, 510' }, { name: 'Business', price: '485, 150' },],
        stops: 1,
      },
      {
        id: 2,
        depart: new Date(Date.now() + 3 * 60 * 60 * 1000),
        from: { name: "Mombasa", country: 'Kenya', alias: "KE" },
        to: { name: "Seatle", country: 'United States', alias: "SEA" },
        packages: [{ name: 'Economy', price: '362,510' }, { name: 'Business', price: '485,150' },],
        stops: 1,
      },
      {
        id: 3,
        depart: new Date(Date.now() + 8 * 60 * 60 * 1000),
        from: { name: "Mombasa", country: 'Kenya', alias: "KE" },
        to: { name: "Nairobi", country: 'Kenya', alias: "NBO" },
        packages: [{ name: 'Economy', price: '5,880' }, { name: 'Business', price: '8,750' },],
        stops: 1,
      },
      {
        id: 4,
        depart: new Date(Date.now() + 2 * 60 * 60 * 1000),
        from: { name: "Mogadishu", country: "Somalia", alias: "SOM" },
        to: { name: "Sydney", country: "Australia", alias: "AUS" },
        packages: [{ name: 'Economy', price: '462,510' }, { name: 'Business', price: '585,150' },],
        stops: 1,
      },
      {
        id: 5,
        depart: new Date(Date.now() + 5 * 60 * 60 * 1000),
        from: { name: "Eldoret", country: "Kenya", alias: "KE" },
        to: { name: "Moscow", country: 'Russia', alias: "RU" },
        packages: [{ name: 'Economy', price: '232,550' }, { name: 'Business', price: '385,450' },],
        stops: 1,
      },
      {
        id: 6,
        depart: new Date(Date.now() + 4 * 60 * 60 * 1000),
        from: { name: "Eldoret", country: "Kenya", alias: "KE" },
        to: { name: "Moscow", country: 'Russia', alias: "RU" },
        packages: [{ name: 'Economy', price: '232,550' }, { name: 'Business', price: '385,450' },],
        stops: 1,
      },
      {
        id: 7,
        depart: new Date(Date.now() + 2 * 60 * 60 * 1000),
        from: { name: "Mogadishu", country: "Somalia", alias: "SOM" },
        to: { name: "Sydney", country: "Australia", alias: "AUS" },
        packages: [{ name: 'Economy', price: '462,510' }, { name: 'Business', price: '585,150' },],
        stops: 1,
      }
    ],

  }),
  actions: {
    searchToggle(val) {
      this.searchShow = val
    },

    toggleStep(val) {
      this.bookingStep = val
    },

    toggleSummary(val) {
      this.cardShow = val
      console.log(this.cardShow)
    },

    updateFetch() {
      if (this.fetched) this.fetched = false
      else this.fetched = true
    },

    changeActivePackage(data) {
      this.activePackage = data
    },

    updatePageState() {
      if (this.pageState) this.pageState = false
      else this.pageState = true
    },

    async getFlights() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(this.routes)
        }, 500)
      })
    },

    AddBookingInfo(info) {
      this.booking = info
    },

    async searchFlight({ from, to, departure, class_type }) {
      var flights = await this.getFlights()

      const formatKey = (obj) => {
        return obj.name + "_" + obj.alias
      }

      const compareDate = (depart) => {
        if (new Date(departure) > new Date(depart)) return true
        return false
      }

      const findClass = (packages) => {

        if (class_type.value == 'all') return true
        const result = packages.find((el) => {
          if (el.name == class_type.value) {
            return true
          }
        })
        return result

      }
      const result = flights.filter((el) => {
        if (formatKey(el.from) == from.value && formatKey(el.to) == to.value && findClass(el.packages) && compareDate(el.depart)) {
          return true
        }
      })

      if (result.length == 0) return false

      this.intermediate['data'] = result
      this.intermediate['class_type'] = class_type.value

      console.log(result)

      return true
    }
  }
})
