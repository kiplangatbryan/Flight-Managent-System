import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
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
      path: "/about-us",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/support",
      name: "support",

      component: () => import("../views/support.vue"),
    },
    {
      path: "/contact-us",
      name: "support",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
