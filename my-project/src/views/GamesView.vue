<!-- fetcha speldata med axios-->
<!---Installera, importera axios och kontrollera att fetchen funkar-->
<!---4d5777beba8a4d2c925016fa53d067b2 min API-->
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
