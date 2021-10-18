const express = require('express');
const router  = express.Router();
const insert = require('./query-helpers/insert');
const selectEvent = require('./query-helpers/selectEvent.js')

module.exports = (db) => {

  const { insertAllInDb } = insert(db);

  // fetch event by url via query; create json
  router.get('/:url', (req, res) => {
    const url = req.params.url;
    selectEvent(db, url)
      .then(data => {
        const events = data.rows;
        res.json({ events });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    insertAllInDb(req.body)
  });

  return router;
};
