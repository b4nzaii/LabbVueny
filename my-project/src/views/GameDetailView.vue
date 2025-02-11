<template>
  <div>
    <h1>{{ game.name }}</h1>
    <img v-if="game.background_image" :src="game.background_image">
    <p>{{ game.description }}</p>
    <p><strong>Released:</strong> {{ game.released }}</p>
    <router-link to="/games">Gå tillbaka</router-link>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'GameDetailView',
  data(){
    return{
      game: {} // Lagrar spelets detaljer
    }
  },
  async created(){
    const gameId = this.$route.params.id // Hämtar spelets ID från URL
    console.log(gameId)
    const response = await axios.get(`https://api.rawg.io/api/games/${gameId}?key=4d5777beba8a4d2c925016fa53d067b2`)
    this.game = response.data
    }
}
</script>
