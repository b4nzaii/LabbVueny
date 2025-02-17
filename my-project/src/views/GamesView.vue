<!-- fetcha speldata med axios-->
<!---Installera, importera axios och kontrollera att fetchen funkar-->
<!---4d5777beba8a4d2c925016fa53d067b2 min API-->
<!--Lägg till templates för att visa datan-->


<!-- Axios Test lyckat gör nu om med tailwind 2025-02-05 (sparar gamla koden utifall att..)-->

<template>
  <div class="flex bg-gray-900 min-h-screen text-white">
    <!-- Sidomeny för att filtrera spel -->
    <Sidebar class="w-1/4 p-6 bg-gray-800" @filter-genre="filterByGenre" @filter-games="filterGames" />

    <main class="flex-grow p-6">
      <h1 class="text-3xl font-bold mb-6">Games</h1>

      <!-- Sortering -->
      <div>
        <label>Order by:</label>
        <select v-model="sortOption">
          <option value="relevance">Relevance</option>
          <option value="released">Release Date</option>
          <option value="popularity">Popularity</option>
          <option value="rating">Average Rating</option>
        </select>
      </div>

      <!-- Spel-grid -->
      <div v-if="sortedGames.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 p-4">
        <GameCard v-for="game in sortedGames" :key="game.id" :game="game" />
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue';
import axios from 'axios';
import GameCard from '../components/GameCard.vue';

export default {
  components: { Sidebar, GameCard },

  data() {
    return {
      games: [],           // Alla spel
      filteredGames: [],   // Filtrerade spel
      sortOption: 'relevance', // Standard-sortering
      selectedGenre: null  // Vald genre
    };
  },

  async created() {
    await this.fetchGames();
  },

  computed: {
    sortedGames() {
      let sorted = this.filteredGames.length ? [...this.filteredGames] : [...this.games];

      if (this.sortOption === 'released') {
        return sorted.sort((a, b) => new Date(b.released) - new Date(a.released));
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
    // Hämtar spel från API
    async fetchGames() {
      const response = await axios.get(`https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=100`);
      this.games = response.data.results;
      this.filteredGames = this.games;
    },

    // Filtrerar spel efter genre
    async filterByGenre(genreId) {
      if (!genreId) {
        this.filteredGames = this.games;
      } else {
        const response = await axios.get(`https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=100&genres=${genreId}`);
        this.filteredGames = response.data.results;
      }
    },

    // Filtrerar spel efter tidsperiod
    async filterGames(filter) {
      let today = new Date().toISOString().split("T")[0];
      let last30Days = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split("T")[0];

      let url = `https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=100`;

      if (filter === "new-releases") {
        url += `&dates=${last30Days},${today}&ordering=-released`;
      } else if (filter === "last-30-days") {
        url += `&dates=${last30Days},${today}&ordering=-released`;
      }

      const response = await axios.get(url);
      this.filteredGames = response.data.results;
    }
  }
};
</script>

<style scoped>
select{
  background-color: #2d3748;
  color:white;
  border: 2px solid #4d5769;
  padding: 6px;
  border-radius: 20px;
  cursor: pointer;
}
select:hover{
  background-color: #4a5568;
}
select:focus{
  outline:none;
  border-color: #63b3ed;
}
</style>
