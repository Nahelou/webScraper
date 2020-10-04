const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const request = require("request");
const {
  response,
  text
} = require("express");

const openDataWebsites = [{
    id: 3,
    name: "DataGouv",
    url: "https://www.data.gouv.fr/fr/search/?q=",
    urlData: "https://www.data.gouv.fr",
    classSearchParent: ".search-result",
    classSearchChild: "search-result dataset-result",
    title: "h4",
    logo: "img",
  },
];

function searchForDataset(selected, keyWord) {
  return fetch(`${selected.url}${keyWord}`)
    .then(response => response.text())
    .then(body => {
      const datasets = [];
      const $ = cheerio.load(body);
      let id = 0;
      $(selected.classSearchParent).each((i, el) => {
        const $element = $(el);
        const card_title = $element.find(selected.title);
        const data_link = $element.find('a');
        const image = $element.find(selected.logo).attr('src');
        const link = data_link.attr('href');
        const decription = $element.find(selected.classSearchChild).text();

        const dataset = {
          id: id,
          text: card_title.text(),
          url: selected.urlData + link,
          img: image,
          description: decription,
        }
        datasets.push(dataset);
        id = id + 1;
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