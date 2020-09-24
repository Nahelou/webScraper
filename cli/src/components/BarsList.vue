<template>
<div>
  <div class="card" v-for="bar in bars" :key="bar._id">
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title is-4">{{bar.name}}</p>
      </div>
    </div>
    <div class="content" v-for="beer in bar.beers" v-bind:key="beer.name">
        <p>{{beer.name}} à {{beer.price}} € </p>
    </div>
  </div>
</div>
</div>
</template>

<script>
import { ref } from '@vue/composition-api';

export default {

  setup() {
    const bars = ref([]);
    const API_URL = 'http://localhost:4242/api/v1/bars';

    async function getBars() {
      const response = await fetch(API_URL);
      const json = await response.json();
      bars.value = json;
    }

    getBars();
    console.log(bars);

    return {
      bars,
    };
  },
};
</script>

<style>

</style>
