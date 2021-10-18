const { json } = require('express');
const express = require('express');
const router  = express.Router();
const insert = require('./query-helpers/insert');
const selectEvent = require('./query-helpers/selectEvent');
const selectTimings = require('./query-helpers/selectTimings');
const select = require('./query-helpers/select');

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
        console.log('event_id', event_id)
        return fetchVisitorsByEventId(event_id);
      })
      .then(visitors => {
        console.log('fetchVisitors complete')
        console.log('visitor', visitors.rows);
        // api.push(visitors.rows);
        // const visitor_id = visitor.rows.id;
        // return fetchResponses
        // for (const visitor)
        console.log('API', api);
        return api;
      })
      .catch(err => console.log(err.message));
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
