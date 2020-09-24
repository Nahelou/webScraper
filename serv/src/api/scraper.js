const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();
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
      name: "OpenData Rennes Metropole",
      url: "https://data.rennesmetropole.fr/explore/?sort=modified",
      classSearchParent: "ods-result-list odswidget-infinite-scroll-results",
      classSearchChild: "ods-catalog-card",
      title: "ods-catalog-card__title ng-binding",
      logo: "ods-svginliner__svg-container",
    },
  ];
// Read All
router.get('/:id/:keyWord', async (req, res, next) => {

    try {
        const { id, keyWord } = req.params;
        const fetchOpenDataWebSite = await fetch(openDataWebsites.find(f => f.id === id).url)
      .then(response => response.text())
      .catch(error => console.log("Got an error on request the website \n", error));
      return fethOpenDataWebSite;

    } catch (error) {
        next(error);
    }
});

module.exports = router;