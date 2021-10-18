module.exports = db => {

  const uniqueUrlGenerator = () => {
    return Math.random().toString(20).substr(2, 10);
  };

  const insertEventInDb = (body) => {

    console.log('insertEventInDb called');

    const event_url = uniqueUrlGenerator();
    const queryParams = [body.organizer_name, body.organizer_email, body.event_title, body.event_desc, body.event_venue, event_url];

    let queryString = `
    INSERT INTO events (creator_name, creator_email, title, description, venue, unique_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id
    `;

    return db.query(queryString, queryParams)
      .catch((err) => {
        console.log('eventinDb error', err.message);
      });
  };

  const insertTimingsInDb = (body, eventID) =>{

    console.log('insertTimingsInDb called');

    let queryString = `
    INSERT INTO timings (event_id, date, start_time, end_time)
    VALUES ($1, $2, $3, $4)
    `;

    //create new promise each loop and push to this arry
    let promises = [];

    for (let i = 0; i < body.time_slot_date.length; i++){
      let queryParams = [eventID, body.time_slot_date[i], body.time_slot_start_time[i], body.time_slot_end_time[i]];

      console.log(queryParams);

      promises.push(db.query(queryString, queryParams));
    }

    Promise.all(promises)
      .then((res) => {
        console.log('all resolved');
      })
      .catch((err) => {
        console.log(err.message);
      })
      .finally(() => {
        db.end();
      });

  };

  const insertAllInDb = (body) => {
    console.log('insertAllinDb call');

    insertEventInDb(body)
    .then((res) => {
      console.log('insertEventInDb', res.rows[0])
      insertTimingsInDb(body, res.rows[0].id);
    })
    .catch(err => console.log('insertAllinDb', err.message));

  };

  return { insertEventInDb, insertTimingsInDb, insertAllInDb };

};
