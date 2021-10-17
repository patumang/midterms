const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // fetch event by url via query; create json
  router.get('/:url', (req, res) => {
    const queryString = `
    SELECT * FROM events
    WHERE unique_url = $1`;
    const queryParams = [ req.params.url ]

    db.query(queryString, queryParams)
      .then(data => {
        const events = data.rows;
        res.json({ events });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }); // note: change query to not display more than necessary

  router.post('/', (req, res) => {
    const uniqueUrl = Math.random().toString(36).substring(2, 8);

    const queryString = `
    INSERT INTO events (
      title,
      description,
      creator_name,
      creator_email,
      venue,
      unique_url
      )
      VALUES ($1, $2, $3, $4, $5, $6);
    `;

    const queryParams = [
      req.body.event_title,
      req.body.event_desc,
      req.body.organizer_name,
      req.body.organizer_email,
      req.body.event_venue,
      uniqueUrl
    ];

    db.query(queryString, queryParams)
    .then(() => console.log('query complete'))
    .catch(err => {
      res
        .status(500)
        .send(err.message);
    });
  });

  return router;
};
