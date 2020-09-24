<template>
  <div class="home">
    <router-link :to="{ name: 'Create' }"
    class="button is-success mx-5 my-5 mt-5">AJOUTER UN BAR</router-link>
    <WebScraper />
  </div>
</template>

<script>

import WebScraper from '@/components/WebScraper.vue';

export default {
  components: {
    WebScraper,
  },
};
</script>
