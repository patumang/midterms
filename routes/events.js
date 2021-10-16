const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  console.log('hello events js');
  router.get("/:id", (params) => {
    console.log('/:id hit')

  });
  return router;
};
