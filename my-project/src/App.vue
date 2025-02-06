<template>
  <header>
    <nav>
      <router-link to="/games">Games</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <div class="search-bar">
      <input v-model="SearchQuery" type="text" placeholder="Sök efter spel">
      <button @click="searchGames">Search</button>
    </div>
  </header>
  <main>
<router-view />
</main>
</template>
<script>
export default{
  name: 'App',
  data(){
    return{
      SearchQuery: ''
    }
  },
  methods: {
    searchGames(){
      console.log(this.SearchQuery)
    }
  }
}
</script>
<style scoped>

.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family:'Courier New', Courier, monospace;
  background-color: white;
}

header {
  width: 100%;
  background-color: black;
  padding: 15px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  gap: 1em;
}

nav a {
  color: white;
  font-size: 25px;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  color: #1279e7;
  text-decoration: underline;
}

main {
  width: 80%;
}
</style>
