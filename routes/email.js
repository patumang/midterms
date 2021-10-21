/* eslint-disable no-unused-labels */
/* eslint-disable indent */
/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();

module.exports = () => {

  router.post('/', (req, res) => {

    // get url
    const url = Object.keys(req.body)[0];
    console.log(url);

    // email stuff goes here


    // to complete request
    res.send('/email post complete');
  });

  return router;
};
