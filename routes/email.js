/* eslint-disable no-unused-labels */
/* eslint-disable indent */
/* eslint-disable camelcase */
const express = require('express');
const sendMail = require('./helpers/mail');
const router  = express.Router();

module.exports = () => {

  router.post('/', (req, res) => {

    // destructure variables to pass;
    const {
      organizer_name,
      organizer_email,
      event_url
    } = req.body;

    // email stuff goes here
    sendMail(organizer_email, organizer_name, event_url);

    // to complete request
    res.send('/email post complete');
  });

  return router;
};
