import { defineStore } from "pinia";
import { toRaw } from "vue";

export const useAppStore = defineStore({
  id: "main",
  state: () => ({
    searchShow: true,
    bookingState: false,
    intermediate: { data: [], to: "", from: "", passengers: 1 },
    pageState: true,
    bookingStep: false,
    siteState: {
      flightTab: true,
      travelerTab: true,
      payTab: true,
    },
    cardShow: false,
    fetched: false,
    activePackage: {},
    booking: { passengers: 1 },
    destinations: [
      { name: "Nairobi", country: "Kenya", alias: "NBO" },
      { name: "Seatle", country: "United States", alias: "SEA" },
      { name: "Moscow", country: "Russia", alias: "RU" },
      { name: "Mombasa", country: "Kenya", alias: "KE" },
      { name: "Eldoret", country: "Kenya", alias: "KE" },
      { name: "Mogadishu", country: "Somalia", alias: "SOM" },
      { name: "Sydney", country: "Australia", alias: "AUS" },
    ],
    routes: [
      {
        id: 1,
        depart: new Date( Date.now() + 8 * 60 * 60 * 1000 ),
        packages: [
          { name: "Economy", price: "362, 510", seats: 70 },
          { name: "Business", price: "485, 150", seats: 40 },
        ],
        stops: 1,
      },
      {
        id: 2,
        depart: new Date( Date.now() + 1 * 24 * 60 * 60 * 1000 ),
        packages: [
          { name: "Economy", price: "362,510", seats: 70 },
          { name: "Business", price: "485,150", seats: 40 },
        ],
        stops: 1,
      },
      {
        id: 3,
        depart: new Date( Date.now() + 2 * 24 * 60 * 60 * 1000 ),
        packages: [
          { name: "Economy", price: "5,880", seats: 70 },
          { name: "Business", price: "8,750", seats: 40 },
        ],
        stops: 1,
      },
      {
        id: 4,
        depart: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000 ),
        packages: [
          { name: "Economy", price: "462,510", seats: 70 },
          { name: "Business", price: "585,150", seats: 40 },
        ],
        stops: 1,
      },
      {
        id: 5,
        depart: new Date( Date.now() + 5 * 24 * 60 * 60 * 1000 ),
        packages: [
          { name: "Economy", price: "232,550", seats: 70 },
          { name: "Business", price: "385,450", seats: 40 },
        ],
        stops: 1,
      },
      {
        id: 6,
        depart: new Date( Date.now() + 8 * 24 * 60 * 60 * 1000 ),
        packages: [
          { name: "Economy", price: "232,550", seats: 70 },
          { name: "Business", price: "385,450", seats: 40 },
        ],
        stops: 1,
      },
      {
        id: 7,
        depart: new Date( Date.now() + 10 * 24 * 60 * 60 * 1000 ),
        packages: [
          { name: "Economy", price: "462,510", seats: 70 },
          { name: "Business", price: "585,150", seats: 40 },
        ],
        stops: 1,
      },
    ],
  }),
  actions: {
    searchToggle(val) {
      this.searchShow = val;
    },
    updateAppState(key) {
      switch (key) {
        case "flightTab":
          if ( this.siteState[ key ] ) this.siteState[ key ] = false;
          else this.siteState[ key ] = true;
          break;
        case "travelerTab":
          if ( this.siteState[ key ] ) this.siteState[ key ] = false;
          else this.siteState[ key ] = true;
          break;
        case "payTab":
          if ( this.siteState[ key ] ) this.siteState[ key ] = false;
          else this.siteState[ key ] = true;
          break;
        default:
          if ( this.siteState[ key ] ) this.siteState[ key ] = false;
          else this.siteState[ key ] = true;
          break;    
        //
      }
    },

    toggleStep(val) {
      this.bookingStep = val;
    },

    toggleSummary(val) {
      this.cardShow = val;
    },

    updateFetch() {
      if ( this.fetched ) this.fetched = false;
      else this.fetched = true;
    },

    changeActivePackage(data) {
      this.activePackage = data;
      this.activePackage[ 'selected' ] = false;
    },

    updatePageState() {
      if ( this.pageState ) this.pageState = false;
      else this.pageState = true;
    },

    async getFlights() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve( this.routes );
        }, 500 );
      } );
    },

    confirmPackage (status) {
      this.activePackage[ 'selected' ] = status;
    },

    AddBookingInfo(info) {
      this.booking = info;
    },

    async searchFlight({ from, to, departure, class_type, passengers }) {
      var flights = await this.getFlights();

      const findClass = (packages) => {
        if ( class_type.value == "Any" ) return true;
        const result = packages.find((el) => {
          if (el.name == class_type.value) {
            return true;
          }
        } );

        if ( result == undefined ) return false;
        return true;
      };
      const avFlights = toRaw( flights );

      const result = avFlights.filter( ( el ) => {
        if ( new Date( el.depart ) > new Date( departure ) ) {
          return true;
        }
      } );

      if ( result.length == 0 ) return false;

      this.booking[ "passengers" ] = parseInt( passengers );

      Object.assign( this.intermediate, {
        to: to.label,
        from: from.label,
        data: result,
        class_type,
        passengers: parseInt( passengers ),
      } );

      setTimeout( () => {
        this.updateFetch();
        this.searchToggle( false );
      }, 1 );
      this.toggleStep( true );

      return true;
    },
  },
} );
