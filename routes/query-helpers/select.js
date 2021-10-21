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

  };

  const fetchTimingsByEventId = event_id => {
    queryString = `
    SELECT id as timing_id, date, start_time, end_time
    FROM timings
    WHERE event_id = $1
    ORDER BY id;
    `;
    const queryParams = [ event_id ];

    return db.query(queryString, queryParams)
    .catch(err => console.log(err.message));
  };
  const fetchTotalVotesByEventId = event_id => {
    /* queryString = `
    SELECT t.id as timing_id, count(r.*) as total_votes
    FROM timings t
      LEFT JOIN responses r ON r.timing_id = t.id
    WHERE t.event_id = $1
    GROUP BY t.id
    ORDER BY t.id;
    `; */
    /* queryString = `
    SELECT r.timing_id, count(r.response) as total_votes
    FROM timings t
      LEFT JOIN responses r ON r.timing_id = t.id
    WHERE t.event_id = 2
    GROUP BY r.timing_id, r.response
    HAVING r.response = true
    ORDER BY r.timing_id;
    `; */
    queryString = `
    SELECT r.timing_id, count(r.*) as total_votes
    FROM timings t
      JOIN responses r ON r.timing_id = t.id
    WHERE t.event_id = $1 AND r.response = true
    GROUP BY r.timing_id
    ORDER BY r.timing_id;
    `;
    const queryParams = [event_id];

    return db.query(queryString, queryParams)
      .catch(err => console.log(err.message));
  };

  const fetchVisitorsByEventId = event_id => {
    const queryString = `
      SELECT id as visitor_id, visitor_name
      FROM visitors
      WHERE event_id = $1
      ORDER BY id;`;
    const queryParams = [ event_id ];

    return db.query(queryString, queryParams)
    .catch(err => console.log(err.message));
  };

  // fetch responses via visitor_id and timings_id
  // use two factor to be explicit; cannot implement; just use visitor_id
  const fetchResponsesByEventId = event_id => {
    queryString = `
    SELECT v.id as visitor_id, r.timing_id, r.response
      FROM visitors v
      JOIN responses r ON r.visitor_id = v.id
    WHERE v.event_id = $1
    ORDER BY v.id, r.timing_id;
    `;
    const queryParams = [event_id];

    /* console.log(visitor_id); */
    return db.query(queryString, queryParams)
    .catch(err => console.log(err.message));
  };

  return { fetchEventsByUrl, fetchTimingsByEventId, fetchTotalVotesByEventId, fetchVisitorsByEventId, fetchResponsesByEventId };

};
