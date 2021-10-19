/* eslint-disable no-unused-labels */
/* eslint-disable indent */
/* eslint-disable camelcase */
const express = require('express');
const router  = express.Router();
const insert = require('./query-helpers/insertResponses');
const select = require('./query-helpers/select');
const update = require('./query-helpers/updateResponses');

module.exports = (db) => {

  const { fetchEventsByUrl } = select(db);
  const { updateResponse } = update(db);
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

  router.post('/update', (req, res) => {
    updateResponse(req.body)
    .catch(err => console.log(err.message));
  });


  return router;
};
