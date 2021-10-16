--Pulls all the timings detail for a given events.id

SELECT timings.id as timing_id, date, start_time, end_time
FROM timings
JOIN events ON event_id = events.id
WHERE events.id = 3
GROUP BY timings.id, date, start_time, end_time
ORDER BY start_time;
