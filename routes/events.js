const { json } = require('express');
const express = require('express');
const router  = express.Router();
const insert = require('./query-helpers/insert');
const selectEvent = require('./query-helpers/selectEvent');
const selectTimings = require('./query-helpers/selectTimings');

module.exports = (db) => {

  const { insertAllInDb } = insert(db);

  // fetch event by url via query; create json
  router.get('/:url', (req, res) => {
    const api = [];
    const url = req.params.url;
    selectEvent(db, url)
      .then(event => {
        api.push(event.rows);
        const event_id = event.rows[0].id;
        return selectTimings(db, event_id);
      })
      .then(timings => {
        api.push(timings.rows);
        res.json({api});
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
