import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Map from '../views/Map.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/create',
    name: 'Create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CreateBar.vue'),
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
