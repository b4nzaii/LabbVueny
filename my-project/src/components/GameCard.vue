<template>
  <div class="game-card" v-if="game && game.id">
    <router-link :to="`/games/${game.id}`">
      <img v-if="game.background_image" :src="game.background_image">
      <h3>{{ game.name }}</h3>
      <p>{{ game.released }}</p>
    </router-link>
  </div>
  <div v-else>
    ❌ Spel saknas
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
  border: 4px solid #c2bfbf;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
}

.game-card img {
  width: 100%;
  height: auto;
  max-height: 150px;
  object-fit: cover;
}

.game-card a {
  text-decoration: none;
  color: inherit;
}
</style>
