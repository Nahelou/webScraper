const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const scraper = require('./scraper');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/search/:id', (req, res) => {
  
  scraper
  .searchForDataset(scraper.getSelectedWebSite(req.params.id))
  .then(datasets => {
    res.json(datasets)
  });  
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
