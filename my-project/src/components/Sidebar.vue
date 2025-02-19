<template>
  <aside class="w-1/6 min-h-screen bg-gray-800 p-6 text-white">
    <button @click="resetGenre" class="reset-btn bg-red-600 text-white hover:bg-red-700">
     ❌ Reset Filter
    </button>


    <h2 class="text-xl font-bold mb-4">Filter</h2>

    <!-- 📌 Tidsfilter -->
    <nav class="space-y-3">
      <button @click="$emit('filter-games', 'new-releases')" class="sidebar-btn">🆕 New Releases</button>
    </nav>

    <!-- 🎮 Genre-filter -->
    <h3 class="text-lg font-semibold mt-6">Genres</h3>
    <ul v-if="genres.length" class="space-y-2">
      <li v-for="genre in genres" :key="genre.id">
        <button
          @click="filterByGenre(genre.id)"
          class="sidebar-btn"
          :class="{ 'bg-gray-700': selectedGenre === genre.id }">
          {{ genre.name }}
        </button>
      </li>
    </ul>

  </aside>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Sidebar',
  data() {
    return {
      genres: [],
      selectedGenre: null
    };
  },
  async created() {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=4d5777beba8a4d2c925016fa53d067b2`);
    this.genres = response.data.results || [];
  },
  methods: {
    filterByGenre(genreId) {
      this.selectedGenre = genreId;
      this.$emit('filter-genre', genreId);
    },
    resetGenre() {
      this.selectedGenre = null;
      this.$emit('filter-genre', null);
    }
  }
};
</script>

<style scoped>
.sidebar-btn {
  display: block;
  width: 100%;
  text-align: left;
  padding: 10px;
  border: none;
  color: white;
  font-size: 1rem;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
}

.sidebar-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.sidebar-btn.active {
  background-color: #2d3748;
}
.reset-btn{
  font-size:1.5rem;
  padding: 5px;
  width:100%;
  border-radius: 12px;
  font-weight:bold;
}
</style>
