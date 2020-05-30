import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: true
  },
  {
    path: "/destination/:slug",
    name: "DestinationDetails",
    props: true,
    component: () => import( /* webpackChunkName: "DestinationDetails" */ "../views/DestinationDetails"),
    children: [
      {
      path: ":experienceSlug",
      name: "experienceDetails",
      props: true,
      component: () => import( /* webpackChunkName: "ExperienceDetails" */ "../views/ExperienceDetails"),
      }
    ],
    beforeEnter: (to, from, next) => {
      const exist = store.destinations.find(
        destination => destination.slug === to.params.slug
      )
      if(exist){
        next()
      }
      else{
        next({name: "notFound"})
      }
    }
  },
  {
    path: "404",
    alias: "*",
    name: "notFound",
    component: () => import( /* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
    props: true
  }

];

const router = new VueRouter({
  mode: "history",
  linkExactActiveClass: "active-class",
  routes
});

export default router;