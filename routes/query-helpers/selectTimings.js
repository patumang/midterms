// fetch timings via event_id
module.exports = (db, event_id) => {
  queryString = `
    SELECT * FROM timings
    WHERE event_id = $1;
    `;
  const queryParams = [ event_id ]

  return db.query(queryString, queryParams)
    // .then(res = console.log(res.rows))
    .catch(err => console.log(err.message));

  };
