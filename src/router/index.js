import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Add from "../views/Add.vue";
import Calendar from "../views/Calendar.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/add",
    name: "Add",
    component: Add
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
