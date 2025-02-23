<template>
  <header class="navbar">
    <nav class="nav-links">
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
 <!-- jag gör om navbaren så det blir lite mer clean -->
<style scoped>
.navbar{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: rgb(13, 34, 41);
  box-shadow: 0 4px 10px rgba(0,0,0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
}
.nav-container{
  display: flex;
  align-items:center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
}

.nav-links{
  display:flex;
  gap: 1.5em;
}
.nav-links a {
  font-size: 28px;
  color: white;
  text-decoration: none;
  font-weight:bolder;
  transition: color 0.4s ease-in-out;
  padding: 8px 20px;
  border-radius: 8px;
}
.nav-links a:hover{
  background: rgba(255,255,255, 0.2)
}
main{
  width: 100%;
  margin-top: 80px;
  padding: 15px;
}
</style>
