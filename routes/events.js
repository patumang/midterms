const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/:url", (req, res) => {
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
  });

  return router;

  // router.get("/:id", (req, res) => {

  //   console.log('getRoute');

    // const queryString = `
    // SELECT * FROM events
    // WHERE unique_url = $1`;
    // const queryParams = [ req.params.id ]

    // db.query(queryString, queryParams)
    //   .then(data => {
    //     const events = data.rows;
    //     res.json({ events });
    //   })
    //   .catch(err => {
    //     res
    //       .status(500)
    //       .json({ error: err.message });
    //   });
};
