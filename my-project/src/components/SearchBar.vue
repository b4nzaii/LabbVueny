<template>
  <div>
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
