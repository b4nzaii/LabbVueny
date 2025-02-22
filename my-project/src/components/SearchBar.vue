<!--Dags att styla searchbar -->
<template>
  <div class="search-container">
    <input
      v-model="searchQuery"
      @input="$emit('update-search', searchQuery)"
      type="text"
      placeholder="🔎 Search for a game"
    />
  </div>
</template>

<script>
export default {
  data() {
    return { searchQuery: "" };
  }
};
</script>
<style scoped>
.search-container{
  margin: 16px;
  display: flex;
  justify-content: center;
}
.search-container input{
  padding: 10px 15px;
  font-size: 16px;
  border: 3px solid #978e8e;
  border-radius: 8px;
  outline: none;
}
.search-container input:focus{
  border-color: lightblue;
}
</style>
