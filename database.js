// load .env data into process.env
require('dotenv').config();

const { Pool }= require('pg');
const dbParams = require('./lib/db');

const pool = new Pool(dbParams);

// console.log(dbParams);
// console.log(pool);
// console.log(process.env);

const fetchEventByUrl = url => {
  const queryString = `SELECT * FROM events WHERE unique_url = $1;`;
  const queryParams = [ url ];

  return pool.query(queryString, queryParams)
  .then(res => res.rows[0])
  .catch(err => console.log(err.message));
};


module.exports = { fetchEventByUrl };
