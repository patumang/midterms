/* eslint-disable no-unused-labels */
/* eslint-disable indent */
/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();
const insert = require('./query-helpers/insertResponses');
const select = require('./query-helpers/select');

module.exports = (db) => {

  const { fetchEventsByUrl } = select(db);
  const {
    insertVisitor,
    insertResponses
  } = insert(db);

  router.post('/', (req, res) => {
    const name = req.body.newVisitorName;
    const responses = req.body.newResponses;
    const url = req.body.uniqueId;

    fetchEventsByUrl(url)
    .then(res => {
      console.log(res.rows)
      const eventId = res.rows[0].id;
      return insertVisitor(name, eventId);
    })
    .then(res => {
      const visitorId = res.rows[0].id;
      insertResponses(responses, visitorId);
    })
    .catch((err => console.log(err.message)));

  });


  return router;
};
