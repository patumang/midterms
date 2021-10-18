const responses = {
  /* query = `
    SELECT id, date, start_time, end_time
    FROM timings
    WHERE event_id = 3;
  `; */
  timeSlots: [
    { date: "Oct 12 2021", startTime: "10:00AM", endTime: "11:00AM" },
    { date: "Oct 13 2021", startTime: "1:00PM", endTime: "2:00PM" },
    { date: "Oct 15 2021", startTime: "11:00AM", endTime: "12:00PM" },
    { date: "Oct 19 2021", startTime: "2:00PM", endTime: "3:00PM" }
  ],
  /* query = `
    SELECT r.timings_id, count(r.*)
    FROM responses r
      JOIN timings t ON r.timings_id = t.id
    WHERE t.event_id = 3
    GROUP BY r.timings_id;
  `; */
  totalVotes: [3, 2, 0, 1],
  /* query = `
    SELECT v.id as visitor_id, r.timings_id
    FROM visitors v
      JOIN responses r ON r.visitor_id = v.id
    WHERE v.event_id = 3;
  `; */
  visitors: [
    { name: "visitor1", answers: [true, true, false, false] },
    { name: "visitor2", answers: [true, true, false, true] },
    { name: "visitor3", answers: [true, false, false, false] }
  ]
};
  //extra queries
/* query = `
    SELECT id, visitor_name
    FROM visitors
    WHERE event_id = 3;
  `;
  query = `
    SELECT *
    FROM responses;
  `; */
