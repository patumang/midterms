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
    const email = req.body.newVisitorEmail;
    const responses = req.body.newResponses;
    const url = req.body.uniqueId;

    fetchEventsByUrl(url)
    .then(res => {
      const eventId = res.rows[0].id;
      return insertVisitor(name, email, eventId);
    })
    .then(res => {
      const visitorId = res.rows[0].id;
      insertResponses(responses, visitorId);
    })
    .catch(err => {
      console.log('/responses/')
      console.log(err);
    });

  });

  router.post('/update/', (req, res) => {
    updateResponse(req.body)
    .catch(err => {
      console.log('/update');
      console.log(err);
    });
  });


  return router;
};
