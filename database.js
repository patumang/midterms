// load .env data into process.env
require('dotenv').config();

const { Pool }= require('pg');
const dbParams = require('./lib/db');

const pool = new Pool(dbParams);

// console.log(dbParams);
// console.log(pool);
// console.log(process.env);
