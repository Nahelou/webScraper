const express = require("express");
const fetch = require("node-fetch");
const cheerio = require("cheerio");
const request = require("request");

const router = express.Router();
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
    classSearchParent: "search-results",
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
// Read All
// router.get("/", (req, res) => {
//   res.json(openDataWebsites);
// });

// Read By ID
router.get("/:id", async (req, res, next) => {
  try {
    console.log("TRY");
    const id = parseInt(req.params.id);
    let selected;

    for (i of openDataWebsites) {
      if (i.id == id) selected = i;
    }
    // console.log(selected);

    let fetchOpenDataWebSite = async () => {
        console.log("fetchOpenDataWebSite");
        let datasets = []; 
        request(
            selected.url,
            (error, response, html) => {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(html);
                    $("p").each((i, el) => {
                        datasets.push(el);
                        console.log(datasets);
                    });
                }
            }
            );
            return datasets;
        }
        res.json(fetchOpenDataWebSite());
    } catch (error) {
        console.log("Got an error on request the website \n", error);
    }
});

// Read By ID and Key Word

router.get("/:id/:keyword", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const kw = req.params.keyword;
    let selected;
    for (i of openDataWebsites) {
      if (i.id == id) selected = i;
    }

    const fetchOpenDataWebSite = await fetch(selected.url + kw)
      .then((response) => response.text())
      .catch((error) =>
        console.log("Got an error on request the website \n", error)
      );
    res.json(fetchOpenDataWebSite);
  } catch (error) {
    next(error);
  }
});

module.exports = router;