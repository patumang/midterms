--Pulls all responses for a given events.id

SELECT events.id as event_id, responses.timings_id as timing_id, responses.visitor_id as visitor_id
FROM responses
JOIN timings on timings_id = timings.id
JOIN events on event_id = events.id
WHERE events.id = 3;
