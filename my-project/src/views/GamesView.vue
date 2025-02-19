<!-- fetcha speldata med axios-->
<!---Installera, importera axios och kontrollera att fetchen funkar-->
<!---4d5777beba8a4d2c925016fa53d067b2 min API-->
<!--Lägg till templates för att visa datan-->
<!-- Axios Test lyckat gör nu om med tailwind (sparar gamla koden utifall att..)-->
<!---Prettier formation!-->

<template>
  <div
    class="flex flex-col lg:flex-row bg-gray-900 min-h-screen text-white w-full"
  >
    <!-- Vänster sidomeny -->
    <Sidebar
      class="hidden lg:block w-1/6 p-6 bg-gray-800"
      @filter-genre="filterByGenre"
      @filter-games="filterGames"
    />
    <!-- Huvudinnehåll -->
    <div class="flex flex-col lg:flex-row flex-grow w-full lg:w-5/6">
      <main class="w-full lg:w-4/5 p-5">
        <h1 class="text-3xl font-bold mb-6 text-center lg:text-left">Games</h1>

        <SearchBar @update-search="searchQuery = $event"/>

        <!-- Sortering -->
        <div class="mb-3 text-center lg:text-left">
          <label class="text-lg font-semibold mr-2">Order by:</label>
          <select
            v-model="sortOption"
            class="p-2 bg-gray-800 text-white border border-gray-600 rounded"
          >
            <option value="relevance">Relevance</option>
            <option value="released">Release Date</option>
            <option value="popularity">Popularity</option>
            <option value="rating">Average Rating</option>
          </select>
        </div>

        <!-- Spelgriden -->
        <div
          v-if="sortedGames.length"
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 p-4"
        >
          <GameCard v-for="game in sortedGames" :key="game.id" :game="game" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import axios from "axios";
import GameCard from "../components/GameCard.vue";
import SearchBar from "../components/SearchBar.vue";

export default {
  components: { Sidebar, GameCard, SearchBar },

  data() {
    return {
      games: [],
      filteredGames: [],
      sortOption: "relevance",
      selectedGenre: null,
      searchQuery:""
    };
  },

  async created() {
    await this.fetchAllGames();
  },

  computed: {
    sortedGames() {
      let sorted = this.filteredGames.length ? [...this.filteredGames] : [...this.games];

      //  Filtrera baserat på sökning
      if (this.searchQuery) {
        sorted = sorted.filter((game) =>
          game.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      //  Sorteringslogik
      if (this.sortOption === "released") {
        return sorted.sort((a, b) => new Date(b.released) - new Date(a.released));
      }
      if (this.sortOption === "popularity") {
        return sorted.sort((a, b) => b.added - a.added);
      }
      if (this.sortOption === "rating") {
        return sorted.sort((a, b) => b.rating - a.rating);
      }
      return sorted;
    },
  },


  methods: {
    // Hämta alla spel och spara dem
    async fetchAllGames() {
      let allGames = [];
      let page = 1;
      let totalPages = 5;

      try {
        while (page <= totalPages) {
          const response = await axios.get(
            `https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page=${page}&page_size=100`
          );

          if (!response.data.results.length) break; //  Stoppar loopen om inga fler spel finns

          allGames = allGames.concat(response.data.results);
          page++;
        }

        // Sparar spelen i state
        this.games = allGames;
        this.filteredGames = allGames;
      } catch (error) {
        console.error("Fel vid hämtning av spel:", error);
      }
    },

    async filterByGenre(genreId) {
      if (!genreId) {
        this.filteredGames = this.games;
      } else {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=100&genres=${genreId}`
        );
        this.filteredGames = response.data.results;
      }
    },

    async filterGames(filter) {
      let today = new Date().toISOString().split("T")[0];
      let last30Days = new Date(new Date().setDate(new Date().getDate() - 30))
        .toISOString()
        .split("T")[0];

      let url = `https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=100`;

      if (filter === "new-releases") {
        url += `&dates=${last30Days},${today}&ordering=-released`;
      } else if (filter === "last-30-days") {
        url += `&dates=${last30Days},${today}&ordering=-released`;
      }

      const response = await axios.get(url);
      this.filteredGames = response.data.results;
    },
  },
};

</script>

<style scoped>
.bg-gray-900 {
  width: 100vw;
  display: flex;
}
select {
  background-color: #2d3748;
  color: white;
  border: 2px solid #4d5769;
  padding: 6px;
  border-radius: 20px;
  cursor: pointer;
}
select:hover {
  background-color: #4a5568;
}
select:focus {
  outline: none;
  border-color: #63b3ed;
}
</style>
