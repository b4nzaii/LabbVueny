<!-- fetcha speldata med axios-->
<!---Installera, importera axios och kontrollera att fetchen funkar-->
<!---4d5777beba8a4d2c925016fa53d067b2 min API-->
<!--Lägg till templates för att visa datan-->


<!-- Axios Test lyckat gör nu om med tailwind 2025-02-05 (sparar gamla koden utifall att..)-->

<template>
  <div class="flex bg-gray-900 min-h-screen text-white">
  <Sidebar />
  <main class="flex-grow p-6">
    <h1 class="text-3xl font-bold mb-6">Spel</h1>
 <!--- Speldgriden -->
 <div v-if="games.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
 <!--Renderar gamecard-->
 <GameCard v-for="game in games" :key="game.id" :game="game" />
 </div>
  </main>
  </div>
</template>
<script>
import Sidebar from '../components/Sidebar.vue'
import axios from 'axios'
import GameCard from '../components/GameCard.vue';
export default{
  name: 'GamesView',
  components: {Sidebar, GameCard},
  data(){
    return{
      games: []
    }
  },
  async created(){
    await this.fetchGames()
  },
  methods: {
    async fetchGames(){
      const response = await axios.get(`https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=10`)
      console.log(response.data)
      this.games = response.data.results
    }
  }
}
</script>

<style scoped>
/** Grund layouten sen! */

</style>
