<!-- fetcha speldata med axios-->
<!---Installera, importera axios och kontrollera att fetchen funkar-->
<!---4d5777beba8a4d2c925016fa53d067b2 min API-->
<!--Lägg till templates för att visa datan-->


<!-- Axios Test lyckat gör nu om med tailwind 2025-02-05 (sparar gamla koden utifall att..)-->

<template>
 <div class="flex bg-gray-900 min-h-screen text-white">
    <!-- Sidopanel för filter och kategorier -->
    <Sidebar class="w-1/4 p-6 bg-gray-800" />

    <!-- Huvudinnehåll med spelgriden -->
    <main class="flex-grow p-6">
      <h1 class="text-3xl font-bold mb-6">Spel</h1>

      <!--- Lägger till dropdown för sortering -->
      <div class="mb-3">
        <label for="sort" class="text-lg font-semibold mr-2">Order by</label>
        <select v-model="sortOption" @change="sortGames" class="p2 bg-gray-800 text-white border border-gray-600">
        <option value="relevance">Relevance</option>
        <option value="released">Release Date</option>
        <option value="popularity">Popularity</option>
        <option value="rating">Average rating</option>
        </select>
      </div>
 <!--- Speldgriden -->
 <div v-if="games.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-4">
 <!--Rendera gamecard!!-->
 <GameCard v-for="game in sortedGames" :key="game.id" :game="game" />
 </div>
  </main>
  </div>
</template>

<!-- Importerar sidebar, axios och gamecard-->
<!-- Uppdatera med sorteringsfunktion för sortoptions-->
<script>
import Sidebar from '../components/Sidebar.vue'
import axios from 'axios'
import GameCard from '../components/GameCard.vue';
export default{
  name: 'GamesView',
  components: {Sidebar, GameCard},
  data(){
    return{
      games: [],
      sortOption: 'relevance',
    }
  },
  async created(){
    await this.fetchGames()
  },
  computed: {
    sortedGames(){
      let sorted = [...this.games];

      if (this.sortOption ==='released'){
        return sorted.sort((a, b) => new Date(b.released) - new Date(a.released))
      }
      if (this.sortOption === "popularity") {
        return sorted.sort((a, b) => b.added - a.added);
      }
      if (this.sortOption === "rating") {
        return sorted.sort((a, b) => b.rating - a.rating);
      }
      return sorted;
    }
  },
  methods: {
    async fetchGames(){
      const response = await axios.get(`https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=30`)
      console.log(response.data)
      this.games = response.data.results
    }
  }
}
</script>
<style scoped>
select{
  background-color: #1d2631;
  color: white;
  border: 2px solid #4b5563;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
}
select:hover{
  background-color: #364044
}
select:focus{
  outline: none;
  border-color: rgb(255, 255, 255);
}
</style>
