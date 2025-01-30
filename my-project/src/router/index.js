import { createRouter, createWebHistory } from 'vue-router'

import GamesView from '../views/GamesView.vue'
import GameDetailView from '../views/GameDetailView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/games', name: 'Games', component: GamesView },
  { path: '/games/:id', name: 'GameDetail', component: GameDetailView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/', redirect: '/games' } // Valfri start sida
]

const router = createRouter({
  history: createWebHistory('/')
})

export default router
