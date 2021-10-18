/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
module.exports = db => {

  const fetchEventsByUrl = url => {
    queryString = `
    SELECT *
    FROM events
    WHERE unique_url = $1;
    `;

    const queryParams = [ url ];

    return db.query(queryString, queryParams)
    .catch(err => console.log(err.message));

  }

  const fetchTimingsByEventId = event_id => {
    queryString = `
    SELECT id as timingId, date, start_time as startTime, end_time as endTime
    FROM timings
    WHERE event_id = $1;
    `;
    const queryParams = [ event_id ];

    return db.query(queryString, queryParams)
    .catch(err => console.log(err.message));
  };

  const fetchVisitorsByEventId = event_id => {
    queryString = `
    SELECT visitor_name, visitor_email, id
    FROM visitors
    WHERE event_id = $1;
    `;
    const queryParams = [ event_id ];

    return db.query(queryString, queryParams)
    .catch(err => console.log(err.message));
  }

  // fetch responses via visitor_id and timings_id
  // use two factor to be explicit; cannot implement; just use visitor_id
  const fetchResponses= visitor_id => {
    queryString = `
    SELECT response
    FROM responses
    WHERE visitor_id = $1;
    `;
    const queryParams = [ visitor_id ];

    /* console.log(visitor_id); */
    return db.query(queryString, queryParams)
    .catch(err => console.log(err.message));
  }

  return { fetchEventsByUrl, fetchTimingsByEventId, fetchVisitorsByEventId, fetchResponses };

  // const insertAllInDb = (body) => {
  //   insertEventInDb(body)
  //   .then((res) => {
  //     insertTimingsInDb(body, res.rows[0].id);
  //   })
  //   .catch(err => console.log(err.message));
  // };

  // const compileApi = url => {
  //   const api = [];
  //   fetchEventsByUrl(url)
  //   .then(event => {
  //     console.log('fetchEventsByUrl complete');
  //     api.push(event.rows[0]);
  //     const event_id = event.rows[0].id;
  //     return fetchTimingsByEventId(event_id);
  //   })
  //   .then(timing => {
  //     console.log('fetchTimings complete');
  //     api.push(timing.rows);
  //     const event_id = timing.rows[0].event_id;
  //     console.log('event_id', event_id)
  //     return fetchVisitorsByEventId(event_id);
  //   })
  //   .then(visitor => {
  //     console.log('fetchVisitors complete')
  //     console.log('visitor', visitor);
  //     api.push(visitor.rows);
  //     // const visitor_id = visitor.rows.id;
  //     // return fetchResponses
  //     console.log(api);
  //     return api;
  //   })
  //   .catch(err => console.log(err.message));
  // }
};
