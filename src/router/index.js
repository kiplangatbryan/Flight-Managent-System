import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter( {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/make-a-booking",
      name: "booking",
      component: () => import("../views/Booking.vue"),
    },
    {
      path: "/tickets-in",
      name: "support",
      component: () => import( "../views/Tickets.vue" ),
    },
  ],
});

export default router;
