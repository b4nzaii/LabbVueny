<template>
  <aside class="sidebar">
    <button @click="resetGenre" class="reset-btn">❌ Reset Filter</button>

    <!-- Tidsfilter -->
    <nav class="time-filter">
      <button @click="$emit('filter-games', 'new-releases')" class="sidebar-btn">
        New Releases
      </button>
    </nav>

    <!-- Genre-filter -->
    <h3 class="sidebar-heading">Genres</h3>
    <ul v-if="genres.length" class="space-y-2">
      <li v-for="genre in genres" :key="genre.id">
        <button
          @click="filterByGenre(genre.id)"
          class="sidebar-btn"
          :class="{ 'active-btn': selectedGenre === genre.id }"
        >
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
      selectedGenre: null,
    };
  },
  async created() {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=4d5777beba8a4d2c925016fa53d067b2`
    );
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
    },
  },
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
  cursor: pointer;
  border-radius: 4px;
}

.sidebar-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.sidebar-btn.active {
  background-color: #2d3748;
}
.reset-btn {
  background-color: red;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease;
}
.sidebar {
  background-color: #2b3444;
  color: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.time-filter {
  margin-bottom: 25px;
}
.sidebar-heading {
  font-size: 1.4rem;
  font-weight: 600;
  margin-top: 15px;
  margin-bottom: 5px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.25);
  padding-bottom: 5px;
}
</style>
