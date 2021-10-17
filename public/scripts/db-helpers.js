require('dotenv').config();
const { Pool } = require("pg");
const dbParams = require("../../lib/db.js");
const pool = new Pool(dbParams);

//test data
const body = {
  event_title: 'test',
  event_desc: '',
  organizer_name: 'test',
  organizer_email: 'test@test.com',
  event_venue: '',
  time_slot_date: [ 'oct 13', 'oct 14', 'oct 15'],
  time_slot_start_time: [ '11:11', '12:12', '3:33'],
  time_slot_end_time: [ '4:44', '5:55', '4:44'],
  event_link_for_self: 'true'
};

const uniqueUrlGenerator = () => {
  return Math.random().toString(20).substr(2, 6);
};

const insertEventInDb = (body) => {
  const event_url = uniqueUrlGenerator();
  const queryParams = [body.organizer_name, body.organizer_email, body.event_title, body.event_desc, body.event_venue, event_url];

  let queryString = `
  INSERT INTO events (creator_name, creator_email, title, description, venue, unique_url)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id
  `;

  return pool.query(queryString, queryParams)
    .then((res) => {
      const eventID = res.rows[0]['id'];
      return eventID;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// insertEventInDb(body); //TEST



const insertTimingsInDb = (body, eventID) =>{
  let queryString = `
  INSERT INTO timings (event_id, date, start_time, end_time)
  VALUES ($1, $2, $3, $4)
  `;

  //create new promise each loop and push to this arry
  let promises = [];

  for (let i = 0; i < body.time_slot_date.length; i++){
    let queryParams = [eventID, body.time_slot_date[i], body.time_slot_start_time[i], body.time_slot_end_time[i]];

    promises.push(pool.query(queryString, queryParams));
  }

  Promise.all(promises)
    .then((res) => {
      console.log('all resolved');
    })
    .catch((err) => {
      console.log(err.message);
    })
    .finally(() => {
      pool.end();
    });

};

// insertTimingsInDb(body, 3);

const insertAllInDb = (body) => {
  // initialize eventID var to pass to insertTimings
  let eventID = 0;
  insertEventInDb(body)
    .then((res) => {
      eventID = res
    })
    .then(() => {
      insertTimingsInDb(body, eventID)
    });

};

insertAllInDb(body);
