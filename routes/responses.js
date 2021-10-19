/* eslint-disable no-unused-labels */
/* eslint-disable indent */
/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();
const insert= require('./query-helpers/insertResponses');

module.exports = (db) => {

  const {
    insertVisitor,
    insertResponses
  } = insert(db);

  router.post('/', (req, res) => {
    const name = req.body.newVisitorName;
    const responses = req.body.newResponses;

    insertVisitor(name)
    .then((res) => {
      const visitorId = res.rows[0].id;
      insertResponses(responses, visitorId);
    })
    .catch((err => console.log(err.message)));


  });


  return router;
};
