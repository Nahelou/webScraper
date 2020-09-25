const express = require('express');

const emojis = require('./emojis');
const bars = require('./bars');
const scraper = require('./scraper');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/bars', bars);
router.use('/scraper', scraper);
module.exports = router;