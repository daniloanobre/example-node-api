const express = require('express');

const Config = require('../models/config');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');

   Config.find()
    // When promise is ready
    .then(configs => res.json(configs))
    // Catch all errors and call the error handler
    .catch(err => next(err))
});

module.exports = router;
