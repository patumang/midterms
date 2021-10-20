module.exports = db => {

  const generateRandomUrl = () => {
    return Math.random().toString(20).substr(2, 10);
  };

  const insertEventInDb = (body) => {
    const event_url = generateRandomUrl();
    const queryParams = [
      body.organizer_name,
      body.organizer_email,
      body.event_title,
      body.event_desc,
      body.event_venue,
      event_url
    ];

    const queryString = `
    INSERT INTO events (creator_name, creator_email, title, description, venue, unique_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
    `;

    return db.query(queryString, queryParams)
      .catch((err) => console.log(err.message));
  };

  const insertTimingsInDb = (body, eventID) =>{
    const queryString = `
    INSERT INTO timings (event_id, date, start_time, end_time)
    VALUES ($1, $2, $3, $4);
    `;

    // bug: wrong loop if there's only one timings input set;
    // possible solution: if time_slot is not array, then don't loop;
    // note: date needs validation; does not accept wrong input type
    if (Array.isArray(body.time_slot_date)) {
      //create new promise each loop and push to this array
      const promises = [];

      for (let i = 0; i < body.time_slot_date.length; i++) {
        const queryParams = [
          eventID,
          body.time_slot_date[i],
          body.time_slot_start_time[i],
          body.time_slot_end_time[i]
        ];
        promises.push(db.query(queryString, queryParams));
      }
      Promise.all(promises)
        .catch((err) => console.log(err.message));
    } else {
      const queryParams = [
        eventID,
        body.time_slot_date,
        body.time_slot_start_time,
        body.time_slot_end_time
      ];

      db.query(queryString, queryParams)
        .catch(err => console.log(err.message));

    }

  };

  const insertAllInDb = (body) => {
    insertEventInDb(body)
      .then((res) => {
        insertTimingsInDb(body, res.rows[0].id);
      })
      .catch(err => console.log(err.message));
  };

  return { insertAllInDb };

};
