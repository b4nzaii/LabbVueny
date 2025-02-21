<template>
  <div class="about-container">
    <h1>About</h1>
    <p>
      This project was inspired by the RAWG.io website - a comprehensive gaming database and review platform.
      I built this site to explore Vue.js, API integration, and responsive design.
    </p>
    <p>
      Visit RAWG.io at
      <a href="https://rawg.io" target="_blank" rel="noopener noreferrer">rawg.io</a>
      if you'd like 😎👍.
    </p>
  </div>
</template>
<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
.about-container{
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  font-family:Arial, Helvetica, sans-serif;
  color: white;
  line-height: 1.6;
}
.about-container h1{
  text-align: center;
  margin-bottom: 25px;
}
.about-container a:hover{
  text-decoration: underline;
}
</style>
