const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    console.log(req.params.id);
  });
  return router;
};
