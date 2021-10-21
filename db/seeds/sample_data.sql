INSERT INTO events (creator_name, creator_email, title, description, venue, unique_url)
VALUES ('Lloyd Jefferson', 'asherpoole@gmx.com', 'Test Event 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus semper neque id rhoncus. Sed tincidunt dictum arcu at semper.', 'Zoom', '123456'), --meeting with 2 timings, no visitors
('Devin Sanders', 'tristanjacobs@gmail.com', 'Test Event 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus semper neque id rhoncus. Sed tincidunt dictum arcu at semper.', 'Google Hangouts', '234567'), --meeting with 2 timings, 2 visitors, 2 response
('Iva Harrison', 'allisonjackson@mail.com', 'Test Event 3', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam luctus semper neque id rhoncus. Sed tincidunt dictum arcu at semper.', 'Zoom', '345678'); --meeting with 4 timings, 3 visitors, 2 response

INSERT INTO visitors (event_id, visitor_name, visitor_email)
VALUES (2, 'Dale Coleman', 'michaelgray@mail.com'),
(2, 'Alejandro Osborne', 'ariaatkinson@outlook.com'),
(3, 'Nell Medina', 'juliansantos@aol.com'),
(3, 'Estelle Walsh', 'elistanton@yahoo.com'),
(3, 'Herbert Graves', 'emilyowen@live.com');

INSERT INTO timings (event_id, date, start_time, end_time)
VALUES (1, '2021-10-17', '13:30', '14:40'),
(1, '2021-10-17', '16:00', '17:00'),
(2, '2021-10-17', '8:00', '10:00'),
(2, '2021-10-17', '10:00', '12:00'),
(3, '2021-10-17', '10:00', '22:00'),
(3, '2021-10-17', '10:30', '22:30'),
(3, '2021-10-17', '11:00', '23:00'),
(3, '2021-10-17', '11:30', '23:30');

/* INSERT INTO responses (timing_id, visitor_id)
VALUES (3, 1),
(4, 2),
(5, 2),
(5, 4); */

INSERT INTO responses(timing_id, visitor_id, response)
  VALUES(3, 1, true),
    (4, 1, false),
    (3, 2, false),
    (4, 2, true),
    (5, 3, false),
    (6, 3, false),
    (7, 3, false),
    (8, 3, false),
    (5, 4, true),
    (6, 4, false),
    (7, 4, false),
    (8, 4, false),
    (5, 5, false),
    (6, 5, false),
    (7, 5, false),
    (8, 5, false);
