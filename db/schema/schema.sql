-- RUN COMMAND \i db/schema/schema.sql

-- DROP TABLE IF EXISTS events CASCADE;
-- DROP TABLE IF EXISTS visitors CASCADE;
-- DROP TABLE IF EXISTS timings CASCADE;
-- DROP TABLE IF EXISTS available_times CASCADE;

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_name VARCHAR(255) NOT NULL,
  creator_email VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  venue VARCHAR(255),
  unique_url VARCHAR(255) NOT NULL
);

CREATE TABLE visitors (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  visitor_name VARCHAR(255) NOT NULL,
  visitor_email VARCHAR(255)
);

CREATE TABLE timings (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  start_time VARCHAR(255) NOT NULL,
  end_time VARCHAR(255) NOT NULL
);

CREATE TABLE responses (
  id SERIAL PRIMARY KEY NOT NULL,
  timings_id INTEGER REFERENCES timings(id) ON DELETE CASCADE,
  visitor_id INTEGER REFERENCES visitors(id) ON DELETE CASCADE
);
