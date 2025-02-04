<!-- fetcha speldata med axios-->
<!---Installera, importera axios och kontrollera att fetchen funkar-->
<!---4d5777beba8a4d2c925016fa53d067b2 min API-->
<!--Lägg till templates för att visa datan-->
<template>
  <div class="games-container">
    <h1>Spel</h1>
    <div v-if="loading" class="loading">Laddar spel.. Be patient :D</div>

    <!--Visa spelen när datan är hämtad -->
    <div v-else class="games-list">
      <div v-for="game in games" :key="game.id" class="game-card">
        <img v-if="game.background_image" :src="game.background_image">
        <h3>{{game.name }}</h3>
        <p>Released: {{ game.released }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'GamesView',
  data(){
    return{
      games:[], //speldatan lagras i array
      loading: false,
    }
  },
  async created(){
    console.log('Fetchar spel hoppas jag..')
    await this.fetchGames()
  },
  methods: {
    async fetchGames(){
      this.loading = true
      try{
        const response = await axios.get(`https://api.rawg.io/api/games?key=4d5777beba8a4d2c925016fa53d067b2&page_size=10`)
        console.log('Responsen', response.data)
        this.games = response.data.results
      }catch(error){
        console.error(error)
        this.error ='Laddar inte in... XDDDD'
      } finally{
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/** Grund layouten sen! */

</style>
