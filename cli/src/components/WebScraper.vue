<template>
  <div>
    <div class="card">
      <form @submit.prevent="getDatasets">
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
      </form>
    </div>
    <div class="card" v-for="dataset in datasets" :key="dataset.id">
      <div class="card-content">
        <div class="field">
          <figure class="image is-48x48" v-if="dataset.img">
            <img v-bind:src="dataset.img" />
          </figure>
          <div class="control">
            <h2 class="subtitle">
              <a v-on:click="openInNewTab(dataset.url)">{{ dataset.text }}</a>
            </h2>
            <h4 class="subtitle">
              <p v-if="dataset.description">{{ dataset.description }}</p>
            </h4>
          </div>
        </div>
      </div>
    </div>
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
        {
          id: 7,
          name: "GeneaNet",
        },
        {
          id: 8,
          name: "GeoBretagne",
        },
      ],
      datasets: [],
    };
  },
  setup() {
    const API_URL = "http://localhost:4242/search/";
    async function getDatasets() {
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
        .then((response) => {
          return response.json();
        })
        .then((d) => {
          console.log(d);
          this.datasets = d;
        })
        .catch((error) =>
          console.log("Got an error on request the website \n", error)
        );
    }
    function openInNewTab(url) {
      const win = window.open(url, "_blank");
      win.focus();
    }

    return {
      getDatasets,
      openInNewTab,
    };
  },
};
</script>

<style></style>
