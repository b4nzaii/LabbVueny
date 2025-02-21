<template>
  <header>
    <nav>
      <router-link to="/games">Games</router-link>
      <router-link to="/about">About</router-link>
    </nav>
  </header>
  <main>
<router-view />
</main>
</template>
<script>
export default{
  name: 'app',
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: black;
  padding: 15px 5px;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
}

nav {
  display: flex;
  gap: 2em;
}

nav a {
  color: white;
  font-size: 30px;
  text-decoration: none;
  font-weight: bold;
}

nav a:hover {
  color: #69adf5;
  text-decoration: underline;
}

main {
  width: 100%;
  margin-top: 60px;
}
</style>
