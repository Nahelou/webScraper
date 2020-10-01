const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const request = require("request");
const {
  response,
  text
} = require("express");

const openDataWebsites = [{
    id: 1,
    name: "OpenDataSoft",
    url: "https://data.opendatasoft.com/explore/?disjunctive.language&disjunctive.source_domain_title&disjunctive.theme&disjunctive.semantic.classes&disjunctive.semantic.properties&sort=explore.popularity_score",
    classSearchParent: "ods-catalog-card",
    classSearchChild: "ods-catalog-card-title",
    title: "h2",
    logo: "svg",
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
    classSearchParent: ".search-result",
    classSearchChild: "search-result dataset-result",
    title: "h4",
    logo: "img",
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
    classSearchParent: "ods-catalog-card",
    classSearchChild: "ods-catalog-card",
    title: "h2",
    logo: "ods-svginliner__svg-container ods-svginliner__svg-container--colorless",
  },
  {
    id: 6,
    name: "OpenData Rennes Metropole",
    url: "https://data.rennesmetropole.fr/explore/?sort=modified",
    classSearchParent: "ods-catalog-card  h2",
    classSearchChild: "ods-catalog-card",
    title: "h2",
    logo: "svg",
  },
  {
    id: 7,
    name: "GeneaNet",
    url: "https://en.geneanet.org/fonds/individus/?size=50&sexe=&ignore_each_patronyme=&prenom=&prenom_operateur=or&ignore_each_prenom=&place__0__=&zonegeo__0__=&country__0__=&region__0__=&subregion__0__=&place__1__=&zonegeo__1__=&country__1__=&region__1__=&subregion__1__=&place__2__=&zonegeo__2__=&country__2__=&region__2__=&subregion__2__=&place__3__=&zonegeo__3__=&country__3__=&region__3__=&subregion__3__=&place__4__=&zonegeo__4__=&country__4__=&region__4__=&subregion__4__=&type_periode=between&from=&to=&exact_month=&exact_day=&exact_year=&go=1&nom=",
    classSearchParent: ".ligne-resultat",
    classSearchChild: ".xlarge-4",
    title: "span",
    logo: "svg",
  },
];

function searchForDataset(selected, keyWord) {
  return fetch(`${selected.url}${keyWord}`)
    .then(response => response.text())
    .then(body => {
      const datasets = [];
      const $ = cheerio.load(body);
      // console.log($.text());
      $(selected.classSearchParent).each((i, el) => {
        const $element = $(el);
        const card_title = $element.find('.xlarge-5 ' + selected.title);
        const data_link = $element.find('a');
        const image = $element.find(selected.logo).attr('src');
        const link = data_link.attr('href');
        const test = $element.find(selected.classSearchChild).text();
        // console.log("Element : " + $element);
        console.log("Lien : " + link);
        console.log("Text : " + card_title.text().replace('├ë', 'é').replace('├¿', 'è'));
        console.log("image : " + image);
        console.log("Text 2 : " + test);

        const dataset = {
          text: card_title.text(),
          lien: selected.urlData + link,
          img: image,
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