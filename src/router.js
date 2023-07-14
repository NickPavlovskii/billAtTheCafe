import { createRouter, createWebHistory } from 'vue-router';
import MainComponent from './components/MainComponent.vue';
import AddPersons from './components/AddPerson.vue';
import AddPositions from './components/AddPosition.vue';
import BillResult from './components/BillResult.vue';
import BillList from "./components/BillList.vue";
const routes = [
  {
    path: '/',
    component: MainComponent,
  },
  {
    path: '/add-persons',
    component: AddPersons,
  },
  {
    path: '/add-positions',
    component: AddPositions,
  },
  {
    path: '/bill-result',
    component: BillResult,
  },
  {
    path: '/billlist',
    component: BillList,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
