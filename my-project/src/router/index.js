import { createRouter, createWebHistory } from 'vue-router';

// Lägger till lazy loading

const GamesView = () => import('../views/GamesView.vue');
const GameDetailView = () => import('../views/GameDetailView.vue');
const AboutView = () => import('../views/AboutView.vue');

const routes = [
  { path: '/games', name: 'Games', component: GamesView },
  { path: '/games/:id', name: 'GameDetail', component: GameDetailView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/', redirect: '/games' }, // Valfri start sida
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
