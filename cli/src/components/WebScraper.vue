<template>
  <div>
    <div class="card" v-for="website in openDataWebsites" :key="website._id">
      <div class="card-content">
        <div class="media">
          <div class="media-content">
            <p class="title is-4">{{ bar.name }}</p>
          </div>
        </div>
        <div class="content" v-for="beer in bar.beers" v-bind:key="beer.name">
          <p>{{ beer.name }} à {{ beer.price }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/composition-api";

export default {
  setup() {
    const openDataWebsites = [
      {
        id: 1,
        name: "OpenDataSoft",
        url:
          "https://data.opendatasoft.com/explore/?disjunctive.language&disjunctive.source_domain_title&disjunctive.theme&disjunctive.semantic.classes&disjunctive.semantic.properties&sort=explore.popularity_score",
        classSearchParent: "ods-catalog-card__wrapper",
        classSearchChild: "ods-catalog-card",
        title: "gotham-book ng-binding",
        logo: "centralstore-catalog-card__portal-icon",
      },
      {
        id: 2,
        name: "Kaggle",
        url: "https://www.kaggle.com/datasets?search=",
        classSearchParent: "sc-pQFHc biYjWK",
        classSearchChild: "sc-oVcRo sc-qYUgX eZPPVU sc-pkryX eJxnfX",
        title: "sc-Axmtr sc-fzoiQi sc-oTDcV fBazUz",
        logo: "sc-pJjas gWUsWA",
      },
      {
        id: 3,
        name: "DataGouv",
        url: "https://www.data.gouv.fr/fr/search/?q=",
        classSearchParent: "search-results",
        classSearchChild: "search-result dataset-result",
        title: "result-title ellipsis",
        logo: "result-logo pull-left",
      },
      {
        id: 4,
        name: "Data World",
        url:
          "https://data.world/search?context=community&page=1&q=fish&type=data",
        classSearchParent: "PaginatedList__noChromeList___3wrVT list-group",
        classSearchChild:
          "Card__card___aSnPt Card__linked___2yUGm Card__chrome___viUm2",
        title: "Card__title___2kymQ",
        logo: "result-logo pull-left",
      },
      {
        id: 5,
        name: "OpenData Paris",
        url:
          "https://opendata.paris.fr/explore/?disjunctive.theme&disjunctive.publisher&disjunctive.keyword&disjunctive.modified&disjunctive.features&sort=modified",
        classSearchParent: "ods-result-list odswidget-infinite-scroll-results",
        classSearchChild: "ods-catalog-card",
        title: "ods-catalog-card__title ng-binding",
        logo:
          "ods-svginliner__svg-container ods-svginliner__svg-container--colorless",
      },
      {
        id: 6,
        name: "Open Data Rennes Metropole",
        url: "https://data.rennesmetropole.fr/explore/?sort=modified",
        classSearchParent: "ods-result-list odswidget-infinite-scroll-results",
        classSearchChild: "ods-catalog-card",
        title: "ods-catalog-card__title ng-binding",
        logo: "ods-svginliner__svg-container",
      },
    ];

    const bars = ref([]);
    const API_URL = "http://localhost:4242/api/v1/bars";

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
