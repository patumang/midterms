// fetch event via unique_url
module.exports = (db, url) => {
  queryString = `
    SELECT * FROM events
    WHERE unique_url = $1;
    `;
  const queryParams = [ url ];

  return db.query(queryString, queryParams)
    .catch(err => console.log(err.message));

}; // note: change query to not display more than necessary
