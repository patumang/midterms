module.exports = db => {

  const insertVisitor = (name, eventId) => {
    const queryString = `
      INSERT INTO visitors (visitor_name, event_id)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const queryParams = [ name, eventId ];

    return db.query(queryString, queryParams);
  };

  // takes array of responses object, then insert to sql database
  const insertResponses = (responses, visitorId) => {

    const queryString = `
      INSERT INTO responses (timing_id, visitor_id, response)
      VALUES ($1, $2, $3);
    `;

    const queries = [];

    for (const response of responses) {
      const queryParams = [
        response.timingId,
        visitorId,
        response.answer
      ];
      queries.push(db.query(queryString, queryParams));
    };
    Promise.all(queries)
    .catch((err) => console.log(err.message));

  };

  return { insertVisitor, insertResponses };
};
