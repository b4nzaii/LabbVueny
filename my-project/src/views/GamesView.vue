<!-- fetcha speldata med axios-->
<!---Installera, importera axios och kontrollera att fetchen funkar-->
<!---4d5777beba8a4d2c925016fa53d067b2 min API-->
<!--Lägg till templates för att visa datan-->
<!-- Axios Test lyckat-->
<!---Prettier formation!-->
<template>
  <div class="container">
    <!-- Sidebar -->
    <Sidebar class="sidebar" @filter-genre="filterByGenre" @filter-games="filterGames" />

    <!-- Main content -->
    <main class="content">
      <h1 class="title">Games</h1>
      <SearchBar @update-search="searchQuery = $event"/>

      <!-- Sortering -->
      <div class="sort-container">
        <label class="sort-label">Order by:</label>
        <select v-model="sortOption" class="sort-select">
          <option value="relevance">Relevance</option>
          <option value="released">Release Date</option>
          <option value="popularity">Popularity</option>
          <option value="rating">Average Rating</option>
        </select>
      </div>

      <!-- Spelgriden -->
      <div v-if="sortedGames.length" class="game-grid">
        <GameCard v-for="game in sortedGames" :key="game.id" :game="game" />
      </div>
    </main>
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
      // Kopiera antingen filteredGames (om några filter applicerats) eller games-arrayen
      let sorted = this.filteredGames.length ? [...this.filteredGames] : [...this.games];

      //  Filtrera baserat på sökning
      if (this.searchQuery) {
        sorted = sorted.filter((game) =>
          game.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      // Beroende på vilket sorteringsalternativ som är valt, sorteras arrayen:
      if (this.sortOption === "released") {
        return sorted.sort((a, b) => new Date(b.released) - new Date(a.released));
      }
      if (this.sortOption === "popularity") {
        return sorted.sort((a, b) => b.added - a.added);
      }
      if (this.sortOption === "rating") {
        return sorted.sort((a, b) => b.rating - a.rating);
      }
      // Om inget specifikt sorteringsalternativ valts, returneras den filtrerade listan som den är
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
      let today = new Date().toISOString().split("T")[0]; // här hämtar jag dagens datum i formatet 'YYYY-MM-DD'
      let last30Days = new Date(new Date().setDate(new Date().getDate() - 30)) // Beräknar datumet för 30 dagar sedan i sammma format
        .toISOString()
        .split("T")[0];

      let url = `https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=100`;
      // Om filtret är "new-releases" eller "last-30-days" läggs parametrar till URL:en
      // Dessa parametrar begränsar resultaten till spel som släppts mellan last 30 Days och idag,
      // och sorterar dem med nyaste släppta först
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
.container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  background-color: #1a202c;
  color: white;
}

.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  width: 250px;
  background-color: #2d3748;
  padding: 20px;
  overflow-y: auto;
  z-index: 999;
  height: 100vh;
}


.content {
  flex-grow: 1;
  padding: 20px;
  margin-left: 250px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.sort-container {
  margin-bottom: 15px;
  text-align: center;
}

.sort-label {
  font-size: 18px;
  font-weight: bold;
  margin-right: 10px;
}

.sort-select {
  padding: 10px;
  border-radius: 5px;
  background-color: #2d3748;
  color: white;
  border: 1px solid #4d5769;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
}

.sort-select:hover {
  background-color: #57687d;
}

/* skapar en responsiv grid med auto-fill */
.game-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 10px;
  width: 100%;
}

/**Media query */
@media (max-width: 768px){
  .container{
    flex-direction:column;
  }
  .sidebar{
    position: static;
    width: 100%;
    min-height: auto;
    padding: 10px;
  }
  .content{
    margin-left:0;
    padding: 10px;
  }
  .title{
    font-size: 24px;
  }
  .game-grid{
    grid-template-columns: (repeat(auto-fill, minmax(150px, 1fr)));
    gap: 15px;
    padding: 6px;
  }
}
@media (min-width: 769px) and (max-width: 1024px){
  .title{
    font-size: 26px;
  }
  .game-grid{
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr))
  }
}
</style>
