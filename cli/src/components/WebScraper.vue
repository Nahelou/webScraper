<template>
  <div>
    <form @submit.prevent="getDatasets">
      <div class="card">
        <div class="card-content">
          <div class="field">
            <div class="control">
              <h2 class="subtitle">Search for datasets</h2>
              <div class="select is-medium">
                <select id="openDataWebsite">
                  <option
                    v-for="website in openDataWebsites"
                    :key="website.id"
                    v-bind:value="website.id"
                  >
                    {{ website.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="field is-grouped mx-5 pb-5">
          <p class="control is-expanded">
            <input
              id="searchKeyword"
              class="input"
              type="text"
              placeholder="Search keyword"
            />
          </p>
          <p class="control">
            <button type="submit" class="button is-success mx-5 my">
              Search
            </button>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  data() {
    return {
      selected: "OpenDataSoft",
      openDataWebsites: [
        {
          id: 1,
          name: "OpenDataSoft",
        },
        {
          id: 2,
          name: "Kaggle",
        },
        {
          id: 3,
          name: "DataGouv",
        },
        {
          id: 4,
          name: "Data World",
        },
        {
          id: 5,
          name: "OpenData Paris",
        },
        {
          id: 6,
          name: "OpenData Rennes Metropole",
        },
      ],
    };
  },
  setup() {
    const API_URL = "http://localhost:4242/api/v1/scraper/";
    async function getDatasets() {
      console.log(openDataWebsite.value + "    " + searchKeyword.value);
      const openDataUrl = openDataWebsite.value;
      const fetchOpenDataWebSite = await fetch(
        API_URL + openDataWebsite.value + "/" + searchKeyword.value,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      )
        .then((response) => console.log(response.text()))
        .catch((error) =>
          console.log("Got an error on request the website \n", error)
        );
    }

    return {
      getDatasets,
    };
  },
};
</script>

<style></style>
