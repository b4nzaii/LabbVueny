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
  name: 'App'
}
</script>
