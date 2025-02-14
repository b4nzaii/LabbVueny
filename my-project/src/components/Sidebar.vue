<template>
  <aside class="w-1/6 min-h-screen bg-gray-800 p-6 text-white">
    <h2 class="text-xl font-bold mb-4">Filter</h2>

    <nav class="space-y-3">
      <button @click="filterGames('new-releases')" class="sidebar-btn">🆕 New Release</button>
      <button @click="filterGames('last-30-days')" class="sidebar-btn">📅 Last 30 days</button>
      <button @click="filterGames('this-week')" class="sidebar-btn">📌 This week</button>
      <button @click="filterGames('next-week')" class="sidebar-btn">⏭️ Next week</button>
    </nav>

    <!---Genre filter-->
    <h3 class="text-lg font-semibold mb-2">Genres</h3>
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
    <button @click="resetGenre" class="sidebar-btn bg-red-500 text-white mt-4">❌ Reset Filter</button>
  </aside>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Sidebar',
  data(){
    return{
      genres: [],
      selectedGenre: null
    }
  },
  async created(){
    const response = await axios.get(`https://api.rawg.io/api/genres?key=4d5777beba8a4d2c925016fa53d067b2`)
    this.genres = response.data.results || []
    console.log(this.genres)
  },
  methods:{
    filterByGenre(genreId){
      this.selectedGenre = genreId
      this.$emit('filter-genre', genreId)
    },
    resetGenre(){
      this.selectedGenre = null
      this.$emit('filter-genre', null)
    }
  }
}


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
}

.sidebar-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
