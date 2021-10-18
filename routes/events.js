const express = require('express');
const router  = express.Router();
const insert = require('./helpers/insert');

module.exports = (db) => {

  const { insertAllInDb } = insert(db);

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

    insertAllInDb(req.body);

    // const uniqueUrl = Math.random().toString(36).substring(2, 18);

    // const queryString = `
    // INSERT INTO events (
    //   title,
    //   description,
    //   creator_name,
    //   creator_email,
    //   venue,
    //   unique_url
    //   )
    //   VALUES ($1, $2, $3, $4, $5, $6)
    //   RETURNING id;
    // `;

    // const queryParams = [
    //   req.body.event_title,
    //   req.body.event_desc,
    //   req.body.organizer_name,
    //   req.body.organizer_email,
    //   req.body.event_venue,
    //   uniqueUrl
    // ];

    // db.query(queryString, queryParams)
    // .then(res => {
    //   console.log(res, '\nquery complete')
    // })
    // .catch(err => {
    //   res
    //     .status(500)
    //     .send(err.message);
    // });

  });

  return router;
};
