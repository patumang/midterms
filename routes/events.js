/* eslint-disable no-unused-labels */
/* eslint-disable indent */
/* eslint-disable camelcase */
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

  const generateRandomUrl = () => {
    return Math.random().toString(20).substr(2, 10);
  };

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
        const finalTotalVotes = [];
        Loop1:
        for (let i = 0; i < api.timeSlots.length; i++) {
          finalTotalVotes[i] = {};
          finalTotalVotes[i]['timing_id'] = api.timeSlots[i]['timing_id'];
          finalTotalVotes[i]['total_votes'] = 0;
          Loop2:
          for (let j = 0; j < totalVotes.rows.length; j++) {
            if (totalVotes.rows[j]['timing_id'] === api.timeSlots[i]['timing_id']) {
              finalTotalVotes[i]['total_votes'] = totalVotes.rows[j]['total_votes'];
              break Loop2;
            }
          }
        }
        //api["totalVotes"] = totalVotes.rows;
        api["totalVotes"] = finalTotalVotes;
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

          for (let res of responses.rows) {
            if (visitor.visitor_id === res.visitor_id) {
              visitorResponse.answers.push(res);
            }
          }
          // Loop2:
          // for (let timing of api.timeSlots) {
          //   let answer = false;
          //   Loop3:
            // for (let res of responses.rows) {
            //   if (res.timing_id === timing.timing_id && res.visitor_id === visitor.visitor_id) {
            //     answer = true;
            //     break Loop3;
            //   }
          //   }
          //   visitorResponse.answers.push({ timing_id: timing.timing_id, answer});
          // }
          resGridData.push(visitorResponse);
        }
        api["responses"] = resGridData;
      })
      .then(() => res.json(api))
      .catch(err => {
        console.log('/events/:url');
        console.log(err);
      });
    };

    compileApi(url);
  }); // end of GET

  router.post('/', (req, res) => {

    const body = req.body;
    body.event_url = generateRandomUrl();

    insertAllInDb(body);

    // the line below can be anything as long as it completes the request;
    // value will then be pass to success handler;
    res.send(body);
  });

  return router;
};
