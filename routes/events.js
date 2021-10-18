const { json, response } = require('express');
const express = require('express');
const router  = express.Router();
const insert = require('./query-helpers/insert');
const select = require('./query-helpers/select');
const restructure = require('./helpers/restructure');

module.exports = (db) => {

  const { insertAllInDb } = insert(db);
  const {
    fetchEventsByUrl,
    fetchTimingsByEventId,
    fetchVisitorsByEventId,
    fetchResponses
  } = select(db);

  // fetch event by url via query; create json
  router.get('/:url', (req, res) => {
    const api = [];
    const url = req.params.url;

    const compileApi = url => {

      fetchEventsByUrl(url)
      .then(event => {
        console.log('fetchEventsByUrl complete');
        api.push(event.rows[0]);
        const event_id = event.rows[0].id;
        return fetchTimingsByEventId(event_id);
      })
      .then(timing => {
        console.log('fetchTimings complete');
        api.push(timing.rows);
        const event_id = timing.rows[0].event_id;
        return fetchVisitorsByEventId(event_id);
      })
      .then(visitors => {
        const distinctVisitors = restructure(visitors.rows);
        api.push(distinctVisitors);
        res.json({api});

      })
      .then(() => res.json({api}))
      .catch(err => console.log(err.message));
    }

    compileApi(url)
    }); // end of GET

    // selectEvent(db, url)
    //   .then(event => {
    //     api.push(event.rows[0]);
    //     const event_id = event.rows[0].id;
    //     return selectTimings(db, event_id);
    //   })
    //   .then(timings => {
    //     api.push(timings.rows);
    //     res.json({api});
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });

  router.post('/', (req, res) => {
    insertAllInDb(req.body);
  });

  return router;
};
