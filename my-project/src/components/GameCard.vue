<template>
  <div class="game-card" v-if="game && game.id">
    <router-link :to="`/games/${game.id}`">
      <img v-if="game.background_image" :src="game.background_image" loading="lazy">
      <h3>{{ game.name }}</h3>
      <p>{{ game.released }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    game: Object
  }
}
</script>

<style scoped>
/* Enkel styling */
.game-card {
  max-width: 250px;
  width: 100%;
  border: 1px solid #4a5568;
  padding: 10px;
  margin: 10px;
  text-align: center;
  background-color: #2d3748;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.game-card:hover {
  text-decoration: none;
  color: inherit;
}

.game-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.game-card h3,
.game-card p {
  color: #FFFFFF;
  font-size: 1.25rem;
}

.game-card a{
  text-decoration: none;
  color: inherit;
}
</style>
