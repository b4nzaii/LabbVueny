<template>
<!-- Kontrollerar att 'game' data finns innan vi renderar sidan -->
<div v-if="game" class="game-detail-container">
    <!-- Bakgrundsbild -->
     <div class="game-header" :style="{ backgroundImage: `url(${game.background_image})` }">
    <!-- Overlay för att göra texten mer läsbar över bakgrunden AA och allt det där 😂 -->
      <div class="overlay">
        <h1 class="game-title">{{ game.name }}</h1>
      </div>
    </div>
    <!-- Huvudinnehållsdelen -->
    <div class="game-content">
      <div class="game-info">
        <h2>About</h2>
    <!-- Spelets beskrivning -->
        <p class="game-description">{{ game.description_raw }}</p>

        <!-- Plattformar & Genrer ska vara här -->
        <div class="game-meta">

          <div v-if="game.platforms">
            <strong>Platforms:</strong>
            <span v-for="platform in game.platforms" :key="platform.platform.id">
              {{ platform.platform.name }}
            </span>
          </div>
          <div v-if="game.genres">
            <strong>Genres:</strong>
            <span v-for="genre in game.genres" :key="genre.id">
              {{ genre.name }}
            </span>
          </div>
        </div>

        <!-- Betyg ska vara här -->
        <div v-if="game.ratings" class="game-ratings">
          <h2>Ratings</h2>
          <div class="rating-container">
        <!-- Itereras över varje rating och applicerar en dynamisk klass beroende på rating titeln-->
            <span
              v-for="rating in game.ratings"
              :key="rating.id"
              class="rating-badge"
              :class="getRatingColor(rating.title)">
              {{ rating.title }} ({{ rating.count }})
            </span>
          </div>
        </div>
      </div>

      <div class="game-sidebar">
        <!-- Releasedatum-->
        <div class="game-details-box">
          <h3>Game Info</h3>
          <p><strong>Released:</strong> {{ game.released || "TBA" }}</p>
        </div>

        <!-- Köp-länkar steam xbox osv -->
        <div v-if="game.stores" class="game-store">
          <h3>Where to Buy</h3>
          <ul>
            <li v-for="store in game.stores" :key="store.store.id">
              <a :href="getStoreUrl(store)" target="_blank" class="store-link">
                 {{store.store.name }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- länk för att gå tillbaka ska vara här -->
    <router-link to="/games" class="back-link">⬅ Go Back</router-link>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      game: null
    };
  },
  async created() {
    const gameId = this.$route.params.id;
    const response = await axios.get(
      `https://api.rawg.io/api/games/${gameId}?key=4d5777beba8a4d2c925016fa53d067b2`
    );
    this.game = response.data;
  },
  methods: {
    getRatingColor(title) {
      const colors = {
        exceptional: 'green',
        recommended: 'blue',
        meh: 'yellow',
        skip: 'red'
      };
      return colors[title.toLowerCase()];
    },
    // Lägger till metoden getStoreUrl för att fånga länkarna..
    // kontrollerar först om "store.url" finns och returnerar den.
    // Om inte så checkar vi om store.store.domain" finns och konstruerar en URL
    // Om inget finns, returneras fallback "#".
    getStoreUrl(store) {
      if (store.url) return store.url;
      if (store.store && store.store.domain) return `https://${store.store.domain}`; // Om domän finns, bygg URL.
      return "#"; // Fallback return om inget hittas.
    }
  }
};
</script>

<style scoped>
.game-detail-container {
  background-color: #181e29;
  color: white;
  min-height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
}
.game-header {
  position: relative;
  width: 60%;
  height: 350px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.overlay {
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 8px;
}
.game-title {
  font-size: 3rem;
  font-weight: bold;
}
.game-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1400px;
  width: 100%;
  padding: 20px;
  margin: 0 auto;
  gap: 20px;
}
.game-info {
  flex: 3;
  padding-right: 20px;
  min-width: 0;
}
.game-description {
  color: white;
  line-height: 1.6;
  overflow-wrap: break-word;
}
.game-meta {
  display: flex;
  gap: 20px;
  margin-top: 10px;
}
.game-meta strong {
  display: block;
  margin-bottom: 5px;
}
.game-ratings {
  margin-top: 20px;
}
.rating-container {
  display: flex;
  gap: 10px;
}
.rating-badge {
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}
.green {
  background-color: green;
}
.blue {
  background-color: blue;
}
.yellow {
  background-color: #b89708;
  color:White;
}
.red {
  background-color: red;
}
.gray {
  background-color: gray;
}
.game-sidebar {
  flex: 1;
  min-width: 350px;
  max-width: 400px;
  background: #2a3444;
  padding: 20px;
  border-radius: 8px;
  align-self: flex-start;
}
.game-details-box {
  margin-bottom: 20px;
}
.game-store ul {
  list-style: none;
  padding: 0;
}
.store-link {
  display: block;
  background: #3285d3;
  color: white;
  text-align: center;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  text-decoration: none;
  transition: background 0.3s;
}
.store-link:hover {
  background: #2c6fb6;
}
.back-link {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #63b3ed;
  text-decoration: none;
  font-size: 1.2rem;
}
.back-link:hover {
  text-decoration: underline;
}
@media (max-width: 768px) {
  /* Gör headern bredare och lite kortare hehe */
  .game-header {
    width: 100%;
    height: 250px;
  }
  .game-title {
    font-size: 2rem;
  }
  /*måste ändra innehållet från radlayout till kolumn */
  .game-content {
    flex-direction: column;
    padding: 10px;
  }
  .game-info {
    padding-right: 0;
  }
  /* Gör sidobaren fullbredd och placerar den under game-info */
  .game-sidebar {
    min-width: 100%;
    max-width: 100%;
    margin-top: 20px;
  }
  .overlay {
    padding: 10px;
  }
}
</style>
