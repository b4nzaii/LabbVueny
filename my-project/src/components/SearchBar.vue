<template>
  <div class="flex items-center bg-gray-800 p-3 rounded-md">
    <input
      v-model="searchQuery"
      @input="$emit('update-search', searchQuery)"
      type="text"
      placeholder="🔎 Search for a game"
      class="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
