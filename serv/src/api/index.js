const express = require('express');

const emojis = require('./emojis');
const bars = require('./bars');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/bars', bars);
module.exports = router;
