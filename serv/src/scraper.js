const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const request = require("request");
const { response } = require("express");

const openDataWebsites = [{
    id: 1,
    name: "OpenDataSoft",
    url: "https://data.opendatasoft.com/explore/?disjunctive.language&disjunctive.source_domain_title&disjunctive.theme&disjunctive.semantic.classes&disjunctive.semantic.properties&sort=explore.popularity_score",
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
    urlData: "https://www.data.gouv.fr",
    classSearchParent: "search-result",
    classSearchChild: "search-result dataset-result",
    title: "result-title ellipsis",
    logo: "result-logo pull-left",
  },
  {
    id: 4,
    name: "Data World",
    url: "https://data.world/search?context=community&page=1&q=fish&type=data",
    classSearchParent: "PaginatedList__noChromeList___3wrVT list-group",
    classSearchChild: "Card__card___aSnPt Card__linked___2yUGm Card__chrome___viUm2",
    title: "Card__title___2kymQ",
    logo: "result-logo pull-left",
  },
  {
    id: 5,
    name: "OpenData Paris",
    url: "https://opendata.paris.fr/explore/?disjunctive.theme&disjunctive.publisher&disjunctive.keyword&disjunctive.modified&disjunctive.features&sort=modified",
    classSearchParent: "ods-result-list odswidget-infinite-scroll-results",
    classSearchChild: "ods-catalog-card",
    title: "ods-catalog-card__title ng-binding",
    logo: "ods-svginliner__svg-container ods-svginliner__svg-container--colorless",
  },
  {
    id: 6,
    name: "OpenData Rennes Metropole",
    url: "https://data.rennesmetropole.fr/explore/?sort=modified",
    classSearchParent: "ods-result-list odswidget-infinite-scroll-results",
    classSearchChild: "ods-catalog-card",
    title: "ods-catalog-card__title ng-binding",
    logo: "ods-svginliner__svg-container",
  },
];

    function searchForDataset(selected, keyWord) {
        return fetch(`${selected.url}${keyWord}`)
        .then(response => response.text())
        .then(body => {
            const datasets = [];
            const $ = cheerio.load(body);
            $('.' + selected.classSearchParent).each((i, el) => {
              const $element = $(el);
              const card_title = $element.find('h4');
              const data_link = $element.find('a');
              const image = $element.find('img').attr('src');
              const link = data_link.attr('href');
              const test = card_title.contents().first().text();
              console.log("Lien : " + link);
              console.log("Text : " + card_title.text());
              console.log("image : " + image);
              const dataset = {
                lien : selected.urlData + link,
                img : image,
              }
              datasets.push(dataset);
            });
        return datasets;
        });
    }

    function getSelectedWebSite(id) {
      let selected;
      for (i of openDataWebsites) {
        if (i.id == id) selected = i;
      }
      console.log(selected);
      return selected;
    }

module.exports = {
  searchForDataset,
  getSelectedWebSite,
};