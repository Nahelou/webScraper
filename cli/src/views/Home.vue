<template>
  <div class="home">
    <router-link :to="{ name: 'Create' }"
    class="button is-success mx-5 my-5">AJOUTER UN BAR</router-link>
    <BarsList />
  </div>
</template>

<script>

import BarsList from '@/components/BarsList.vue';

export default {
  components: {
    BarsList,
  },
};
</script>
