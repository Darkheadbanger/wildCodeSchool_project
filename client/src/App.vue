<script setup>
// import Home from "../src/views/ArgonautesView.vue";
</script>

<template>
  <!-- Possibilit√© de ne pas passer par router donc on utilise <Home/> -->
  <RouterView />
</template>

<style lang="scss">
*,
*::after,
*::before {
  @include fullBody;
}
</style>
