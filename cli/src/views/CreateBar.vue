<template>

  <form @submit.prevent="createBar">
    <div class="field">
  <label class="label">Name</label>
  <div class="control">
    <input v-model="name" class="input" name="Name" type="text" placeholder="e.g Buck Mulligan">
  </div>
</div>
<div>
<div class="field">
    <label class="label">Beer</label>
  </div>
  <div class="field-body">
    <div class="field">
      <p class="control is-expanded has-icons-left">
        <input v-model="beers"  class="input" name="Beer" type="text" placeholder="e.g Duvel">
        <span class="icon is-small is-left">
          <i class="fas fa-user"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <div class="field has-addons ">
        <p class="control">
          <span class="select">
            <select>
              <option>€</option>
              <option>$</option>
              <option>£</option>
            </select>
          </span>
        </p>
        <p class="control">
          <input class="input" name="Price" type="text" placeholder="Price">
        </p>
        <p class="control mx-5">
          <a class="button is-primary">
            ADD BEER
          </a>
        </p>
      </div>
    </div>
  </div>
</div>
<button type="submit" class="button is-success mt-5">Create</button>
</form>

</template>

<script>
import { ref } from '@vue/composition-api';
import { useRouter } from '@u3u/vue-hooks';

export default {
  setup() {
    const { router } = useRouter();
    const name = ref('');
    const beers = ref('');

    const API_URL = 'http://localhost:4242/api/v1/bars';

    async function createBar() {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name: name.value,
          happyHour: beers.value,
        }),
      });
      const json = await response.json();
      if (response.ok) {
        // redirection
        router.push({
          name: 'Home',
        });
      } else {
        // TODO: show an error
      }
    }
    return {
      name,
      beers,
      createBar,
    };
  },
};
</script>

<style>

</style>
