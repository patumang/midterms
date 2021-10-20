/* eslint-disable no-unused-labels */
/* eslint-disable indent */
/* eslint-disable camelcase */
const { json, response } = require('express');
const express = require('express');
const router  = express.Router();
const insert = require('./query-helpers/insert');
const select = require('./query-helpers/select');

module.exports = (db) => {

  const { insertAllInDb } = insert(db);
  const {
    fetchEventsByUrl,
    fetchTimingsByEventId,
    fetchTotalVotesByEventId,
    fetchVisitorsByEventId,
    fetchResponsesByEventId
  } = select(db);

  // fetch event by url via query; create json
  router.get('/:url', (req, res) => {
    const url = req.params.url;
    let api = {};
    let event_id;

    const compileApi = url => {

      fetchEventsByUrl(url)
      .then(event => {
        api["event_details"] = event.rows[0];
        event_id = event.rows[0].id;
        return fetchTimingsByEventId(event_id);
      })
      .then(timing => {
        api["timeSlots"] = timing.rows;
        return fetchTotalVotesByEventId(event_id);
      })
      .then(totalVotes => {
        api["totalVotes"] = totalVotes.rows;
        return fetchVisitorsByEventId(event_id);
      })
      .then(visitors => {
        api["visitors"] = visitors.rows;
        return fetchResponsesByEventId(event_id);
      })
      .then(responses => {

        const resGridData = [];
        Loop1:
        for (let visitor of api.visitors) {
          const visitorResponse = {visitor_id: visitor.visitor_id, visitor_name: visitor.visitor_name, answers: []};
          Loop2:
          for (let timing of api.timeSlots) {
            let answer = false;
            Loop3:
            for (let res of responses.rows) {
              if (res.timing_id === timing.timing_id && res.visitor_id === visitor.visitor_id) {
                answer = true;
                break Loop3;
              }
            }
            visitorResponse.answers.push({ timing_id: timing.timing_id, answer});
          }
          resGridData.push(visitorResponse);
        }
        api["responses"] = resGridData;
      })
      .then(() => res.json(api))
      .catch(err => {
        console.log('/events/:url')
        console.log(err);
      });
    };

    compileApi(url);
  }); // end of GET

  router.post('/', (req, res) => {
    insertAllInDb(req.body);
    res.redirect(`/events/${req.body.event_url}`); // this can be anything as long as it complete the request;
  });

  return router;
};
